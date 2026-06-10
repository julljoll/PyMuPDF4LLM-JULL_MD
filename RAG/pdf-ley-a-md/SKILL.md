---
name: pdf-ley-a-md
description: >
  Convierte leyes, decretos, reglamentos y documentos jurídicos desde PDF a Markdown estructurado
  usando PyMuPDF4LLM. Úsalo SIEMPRE que el usuario mencione: convertir ley a markdown, PDF de ley,
  decreto en PDF, reglamento PDF, documento jurídico a .md, ley a texto, norma en PDF, código civil PDF,
  constitución PDF, o cualquier combinación de documento legal + conversión + markdown/texto.
  También activa cuando el usuario suba un PDF y quiera procesarlo para RAG, LLM, base de conocimiento
  legal o edición de texto legal. Incluye limpieza automática de artefactos, detección de estructura
  jerárquica (títulos, capítulos, artículos), manejo de tablas y notas al pie.
---

# Skill: PDF de Ley → Markdown

Convierte documentos jurídicos PDF a Markdown limpio, estructurado y listo para LLMs o edición humana.

---

## Flujo de trabajo

```
1. INSTALAR dependencias
2. ANALIZAR el PDF (estructura, páginas, calidad, columnas)
3. CONVERTIR con PyMuPDF4LLM (parámetros optimizados para leyes)
4. LIMPIAR el Markdown (artefactos jurídicos comunes)
5. POST-PROCESAR (jerarquía, artículos, notas al pie, tablas)
6. GUARDAR y presentar el .md
```

Antes de ejecutar cualquier script, leer el archivo de referencia cuando sea necesario:
- Estructura legal compleja → `references/legal-structure.md`
- Problemas de calidad/OCR → `references/troubleshooting.md`

---

## Paso 1 — Verificar e instalar dependencias

```bash
pip install pymupdf4llm --break-system-packages -q
pip install pymupdf --break-system-packages -q
```

Verificar instalación:
```python
import pymupdf4llm
print(pymupdf4llm.VERSION)  # debe ser ≥ 1.27
```

---

## Paso 2 — Analizar el PDF antes de convertir

Siempre ejecutar el **análisis previo** para elegir los parámetros correctos:

```python
# scripts/analyze_pdf.py
import pymupdf, sys, json

def analyze_law_pdf(path):
    doc = pymupdf.open(path)
    info = {
        "pages": doc.page_count,
        "title": doc.metadata.get("title", ""),
        "has_text": False,
        "is_scanned": False,
        "multi_column": False,
        "has_tables": False,
        "avg_font_sizes": [],
        "languages": set(),
    }

    sample_pages = list(range(min(5, doc.page_count)))
    for pno in sample_pages:
        page = doc[pno]
        blocks = page.get_text("dict")["blocks"]
        text_blocks = [b for b in blocks if b["type"] == 0]
        
        if text_blocks:
            info["has_text"] = True
        
        # Detectar multi-columna (bloques con x0 muy distintos)
        x_positions = [b["bbox"][0] for b in text_blocks]
        if x_positions:
            x_range = max(x_positions) - min(x_positions)
            if x_range > page.rect.width * 0.3:
                info["multi_column"] = True
        
        # Detectar escaneado (sin texto extraíble)
        raw_text = page.get_text().strip()
        if not raw_text and blocks:
            info["is_scanned"] = True
        
        # Recolectar tamaños de fuente
        for b in text_blocks:
            for line in b.get("lines", []):
                for span in line.get("spans", []):
                    info["avg_font_sizes"].append(round(span["size"], 1))
    
    if info["avg_font_sizes"]:
        from collections import Counter
        top_sizes = Counter(info["avg_font_sizes"]).most_common(5)
        info["top_font_sizes"] = top_sizes
    
    doc.close()
    return info

if __name__ == "__main__":
    result = analyze_law_pdf(sys.argv[1])
    print(json.dumps(result, indent=2, default=list))
```

Ejecutar: `python3 scripts/analyze_pdf.py <ruta_al_pdf>`

**Interpretar resultados:**

| Condición | Acción |
|---|---|
| `is_scanned: true` | Usar OCR (ver sección OCR) |
| `multi_column: true` | Añadir `margins=(36,36,36,36)` |
| `pages > 300` | Procesar por lotes con `pages=[...]` |
| `has_text: false` | PDF protegido o corrupto → advertir al usuario |

---

## Paso 3 — Conversión principal

Usar el script canónico de conversión:

```python
# scripts/convert_law.py
import pymupdf4llm
import pymupdf
import sys, os, re, argparse
from pathlib import Path

def convert_law_pdf(
    input_path: str,
    output_path: str = None,
    pages: list = None,
    multi_column: bool = False,
    embed_images: bool = False,
    table_strategy: str = "lines_strict",
    margins: tuple = (36, 54, 36, 54),  # left, top, right, bottom (puntos PDF)
    dpi: int = 150,
    page_chunks: bool = False,
) -> str:
    """
    Convierte un PDF de ley a Markdown limpio.
    
    Args:
        input_path: ruta al PDF
        output_path: ruta de salida .md (si None, usa mismo nombre)
        pages: lista de páginas 0-based (None = todas)
        multi_column: activa manejo de múltiples columnas
        embed_images: incrustar imágenes como base64
        table_strategy: 'lines_strict' | 'lines' | 'explicit_only' | 'text_as_image'
        margins: márgenes a ignorar (left, top, right, bottom) en puntos
        dpi: resolución para imágenes
        page_chunks: devolver por páginas en vez de string continuo
    """
    
    # Ajustar márgenes para multi-columna
    if multi_column:
        margins = (72, 54, 72, 54)
    
    md = pymupdf4llm.to_markdown(
        doc=input_path,
        pages=pages,
        hdr_info=None,             # detección automática de encabezados
        write_images=False,
        embed_images=embed_images,
        ignore_images=not embed_images,
        ignore_graphics=True,      # ignorar vectoriales decorativos
        detect_bg_color=True,      # detectar texto sobre fondo de color
        force_text=True,           # extraer texto aunque haya imágenes de fondo
        page_chunks=page_chunks,
        page_separators=True,      # separadores entre páginas
        margins=margins,
        dpi=dpi,
        table_strategy=table_strategy,
        fontsize_limit=3,          # ignorar fuentes decorativas mínimas
        ignore_code=True,          # evitar bloques de código en texto legal
        show_progress=True,
        ignore_alpha=True,         # ignorar watermarks semitransparentes
    )
    
    # Si page_chunks, unir todo
    if page_chunks and isinstance(md, list):
        md = "\n\n---\n\n".join(chunk.get("text", "") for chunk in md)
    
    # Guardar
    if output_path is None:
        output_path = Path(input_path).with_suffix(".md")
    
    Path(output_path).write_text(md, encoding="utf-8")
    print(f"✓ Guardado: {output_path} ({len(md):,} caracteres)")
    return md


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convierte PDF de ley a Markdown")
    parser.add_argument("input", help="Ruta al PDF de entrada")
    parser.add_argument("-o", "--output", help="Ruta de salida .md")
    parser.add_argument("--pages", help="Páginas separadas por coma (ej: 0,1,5-10)")
    parser.add_argument("--multi-column", action="store_true")
    parser.add_argument("--embed-images", action="store_true")
    parser.add_argument("--table-strategy", default="lines_strict",
                        choices=["lines_strict", "lines", "explicit_only", "text_as_image"])
    args = parser.parse_args()
    
    pages = None
    if args.pages:
        pages = []
        for part in args.pages.split(","):
            if "-" in part:
                a, b = part.split("-")
                pages.extend(range(int(a), int(b)+1))
            else:
                pages.append(int(part))
    
    convert_law_pdf(
        args.input,
        args.output,
        pages=pages,
        multi_column=args.multi_column,
        embed_images=args.embed_images,
        table_strategy=args.table_strategy,
    )
```

---

## Paso 4 — Limpieza y post-procesado legal

Después de la conversión, ejecutar el limpiador especializado en textos jurídicos:

```python
# scripts/clean_legal_md.py
import re, sys
from pathlib import Path

# ── Patrones específicos de documentos legales ──────────────────────────────

# Números de página sueltos
PAGE_NUMBER = re.compile(r"^\s*[-–—]?\s*\d+\s*[-–—]?\s*$", re.MULTILINE)

# Encabezados/pies de página repetidos (detectar líneas que se repiten >3 veces)
def remove_repeated_lines(text: str, min_repeats: int = 3) -> str:
    from collections import Counter
    lines = text.split("\n")
    counts = Counter(l.strip() for l in lines if len(l.strip()) > 5)
    repeated = {l for l, c in counts.items() if c >= min_repeats}
    return "\n".join(l for l in lines if l.strip() not in repeated)

# Guiones de separación de palabras al final de línea (en español: "consti-\ntución")
WORD_HYPHEN = re.compile(r"(\w{3,})-\n(\w{3,})", re.UNICODE)

# Espacios múltiples dentro de líneas
MULTI_SPACE = re.compile(r"[ \t]{2,}")

# Líneas en blanco excesivas (>2 seguidas)
MULTI_BLANK = re.compile(r"\n{3,}")

# Artículos: normalizar "Artículo 1.-", "Art. 1°", "ARTÍCULO 1." → "## Artículo 1"
ARTICULO = re.compile(
    r"^(ARTÍCULO|Artículo|Art\.?)\s*(\d+[\.\-°]?)\s*[\.–\-]?\s*",
    re.MULTILINE | re.IGNORECASE
)

# Capítulos y Títulos → encabezados H1/H2
TITULO = re.compile(
    r"^(TÍTULO|CAPÍTULO|SECCIÓN|LIBRO|PARTE)\s+(I{1,3}V?|VI{0,3}|IX|X{1,3}|[IVXLCDM]+|\d+)\b",
    re.MULTILINE | re.IGNORECASE
)

# Notas al pie: números superíndice seguidos de texto en pie de página
FOOTNOTE_REF = re.compile(r"(\w)\^(\d+)", re.UNICODE)

# Tabla de Contenidos espuria (líneas de puntos)
TOC_DOTS = re.compile(r"^.+\.{3,}\s*\d+\s*$", re.MULTILINE)


def clean_legal_markdown(text: str) -> str:
    """Limpia y estructura un Markdown generado desde PDF legal."""
    
    # 1. Eliminar números de página sueltos
    text = PAGE_NUMBER.sub("", text)
    
    # 2. Eliminar líneas repetidas (encabezados/pies)
    text = remove_repeated_lines(text)
    
    # 3. Unir palabras partidas con guión al final de línea
    text = WORD_HYPHEN.sub(r"\1\2", text)
    
    # 4. Limpiar espacios múltiples
    text = MULTI_SPACE.sub(" ", text)
    
    # 5. Eliminar líneas de TOC (puntos suspensivos)
    text = TOC_DOTS.sub("", text)
    
    # 6. Normalizar artículos como encabezados H3
    text = ARTICULO.sub(r"### Artículo \2 — ", text)
    
    # 7. Normalizar Títulos/Capítulos como encabezados H1/H2
    def fmt_titulo(m):
        kw = m.group(1).capitalize()
        num = m.group(2)
        level = "# " if kw in ("Título", "Libro", "Parte") else "## "
        return f"\n{level}{kw} {num}"
    text = TITULO.sub(fmt_titulo, text)
    
    # 8. Formatear referencias de notas al pie
    text = FOOTNOTE_REF.sub(r"\1[^\2]", text)
    
    # 9. Reducir líneas en blanco excesivas
    text = MULTI_BLANK.sub("\n\n", text)
    
    # 10. Strip general
    text = text.strip()
    
    return text


def add_frontmatter(text: str, source_path: str) -> str:
    """Añade metadatos YAML al inicio del Markdown."""
    from datetime import date
    fname = Path(source_path).stem
    fm = f"""---
title: "{fname}"
source: "{Path(source_path).name}"
converted: "{date.today().isoformat()}"
tool: "pymupdf4llm"
---

"""
    return fm + text


if __name__ == "__main__":
    input_path = sys.argv[1]
    text = Path(input_path).read_text(encoding="utf-8")
    
    text = clean_legal_markdown(text)
    text = add_frontmatter(text, input_path)
    
    out = Path(input_path).with_stem(Path(input_path).stem + "_clean")
    out.write_text(text, encoding="utf-8")
    print(f"✓ Limpiado: {out}")
```

---

## Paso 5 — Pipeline completo (un solo comando)

Para procesar en un solo paso (análisis + conversión + limpieza):

```python
# scripts/pipeline.py
import subprocess, sys, json
from pathlib import Path

def run(pdf_path: str, output_dir: str = None):
    pdf = Path(pdf_path)
    out_dir = Path(output_dir) if output_dir else pdf.parent
    out_dir.mkdir(parents=True, exist_ok=True)
    
    # 1. Analizar
    result = subprocess.run(
        ["python3", "scripts/analyze_pdf.py", str(pdf)],
        capture_output=True, text=True
    )
    analysis = json.loads(result.stdout)
    print("📊 Análisis:", json.dumps(analysis, indent=2, default=list))
    
    # 2. Construir argumentos de conversión
    args = ["python3", "scripts/convert_law.py", str(pdf),
            "-o", str(out_dir / (pdf.stem + ".md"))]
    
    if analysis.get("multi_column"):
        args.append("--multi-column")
        print("  → Multi-columna detectada")
    
    if analysis.get("is_scanned"):
        print("  ⚠ PDF escaneado detectado. Ver references/troubleshooting.md para OCR.")
        return
    
    # 3. Convertir
    subprocess.run(args, check=True)
    
    # 4. Limpiar
    md_path = str(out_dir / (pdf.stem + ".md"))
    subprocess.run(["python3", "scripts/clean_legal_md.py", md_path], check=True)
    
    print(f"\n✅ Pipeline completo. Archivos en: {out_dir}")

if __name__ == "__main__":
    run(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
```

Ejecutar: `python3 scripts/pipeline.py <ruta.pdf> [directorio_salida]`

---

## Casos especiales

### PDFs escaneados (sin texto digital)
Ver `references/troubleshooting.md` → sección OCR.

Solución rápida con Tesseract:
```python
import pymupdf4llm
# Requiere: pip install rapidocr-onnxruntime
md = pymupdf4llm.to_markdown(doc="ley.pdf", ocr=True)
```

### PDFs de múltiples leyes concatenadas
Detectar por saltos de portada y dividir por páginas:
```python
md_chunks = pymupdf4llm.to_markdown("leyes.pdf", page_chunks=True)
# Cada chunk tiene: {"page": N, "text": "...", "metadata": {...}}
```

### PDFs con tablas complejas (presupuestos, aranceles)
```python
md = pymupdf4llm.to_markdown(
    "ley_presupuesto.pdf",
    table_strategy="lines",   # más permisivo que lines_strict
    ignore_graphics=False,    # mantener bordes de tabla
)
```

### PDFs protegidos con contraseña
```python
import pymupdf
doc = pymupdf.open("ley_protegida.pdf")
doc.authenticate("contraseña")
md = pymupdf4llm.to_markdown(doc)
```

---

## Parámetros de referencia rápida

| Parámetro | Valor recomendado leyes | Notas |
|---|---|---|
| `table_strategy` | `"lines_strict"` | `"lines"` si hay tablas complejas |
| `margins` | `(36, 54, 36, 54)` | Ajustar si hay encabezados/pies anchos |
| `ignore_graphics` | `True` | Ignorar logos y sellos decorativos |
| `ignore_code` | `True` | Evitar bloques `code` en texto legal |
| `force_text` | `True` | Obligatorio para texto sobre imagen |
| `detect_bg_color` | `True` | Resaltar texto de fondos de color |
| `ignore_alpha` | `True` | Eliminar marcas de agua semitransparentes |
| `dpi` | `150` | 300 solo si se necesitan imágenes de alta calidad |
| `page_separators` | `True` | Mantener `---` entre páginas |

---

## Salida esperada

```markdown
---
title: "ley_20123"
source: "ley_20123.pdf"
converted: "2025-06-10"
tool: "pymupdf4llm"
---

# Título I — Disposiciones Generales

## Capítulo I — Objeto y Ámbito de Aplicación

### Artículo 1 — Objeto

La presente ley tiene por objeto...

### Artículo 2 — Ámbito de aplicación

Las disposiciones de esta ley son aplicables a...
```

---

## Verificación de calidad

Después de la conversión, verificar:
- [ ] Los artículos tienen el formato `### Artículo N —`
- [ ] No hay números de página sueltos
- [ ] Las tablas están en sintaxis Markdown válida (`|---|`)
- [ ] No hay líneas de guiones o puntos (artefactos de TOC)
- [ ] El frontmatter YAML está presente
- [ ] Encoding correcto (tildes y ñ visibles sin escapes)

Leer `references/legal-structure.md` para guía de estructuras jurídicas complejas.
