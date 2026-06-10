# Guía de Solución de Problemas

## Diagnóstico rápido

| Síntoma | Causa probable | Solución |
|---|---|---|
| Markdown vacío o mínimo | PDF escaneado | Ver sección OCR |
| Texto mezclado y desordenado | Multi-columna | `margins=(72,54,72,54)` |
| Encabezados de página en el texto | Márgenes pequeños | Aumentar `margins` superior |
| Tablas corruptas | `lines_strict` muy restrictivo | Usar `"lines"` o `"explicit_only"` |
| Caracteres extraños (□, ▪) | Fuente no embebida | Ver sección Encoding |
| Artículos como código monoespaciado | Fuente tipo Courier | `ignore_code=True` |
| Watermarks/marcas de agua en texto | Alpha transparente | `ignore_alpha=True` |
| PDF no abre | Contraseña / corrupto | Ver sección Protección |

---

## OCR: PDFs escaneados

### Opción A — RapidOCR (recomendado, sin Tesseract)
```bash
pip install rapidocr-onnxruntime --break-system-packages -q
```
```python
import pymupdf4llm
md = pymupdf4llm.to_markdown("ley_escaneada.pdf", ocr=True)
```

### Opción B — Tesseract (alta calidad, más lento)
```bash
apt-get install tesseract-ocr tesseract-ocr-spa -y
pip install pytesseract --break-system-packages -q
```
```python
import pymupdf, pytesseract
from PIL import Image
import io

doc = pymupdf.open("ley_escaneada.pdf")
pages_text = []
for page in doc:
    pix = page.get_pixmap(dpi=300)
    img = Image.open(io.BytesIO(pix.tobytes("png")))
    text = pytesseract.image_to_string(img, lang="spa")
    pages_text.append(text)

full_text = "\n\n---\n\n".join(pages_text)
```

### Verificar si un PDF es escaneado
```python
import pymupdf

def is_scanned(path, sample=3):
    doc = pymupdf.open(path)
    for i in range(min(sample, doc.page_count)):
        if doc[i].get_text().strip():
            return False
    return True
```

---

## Encoding: Caracteres especiales

### Problema: tildes y ñ aparecen como □ o ?
```python
# Forzar encoding correcto al leer
text = Path("ley.md").read_text(encoding="utf-8", errors="replace")

# O usar chardet para detectar
import chardet
raw = Path("ley.pdf").read_bytes()
detected = chardet.detect(raw[:10000])
print(detected)  # {'encoding': 'ISO-8859-1', 'confidence': 0.8}
```

### Fuentes sin mapeo de caracteres
Algunos PDFs usan fuentes privadas. Solución:
```python
md = pymupdf4llm.to_markdown(
    "ley.pdf",
    use_glyphs=True,  # intentar mapeo de glifos
    force_text=True,
)
```

---

## PDFs protegidos con contraseña

```python
import pymupdf

doc = pymupdf.open("ley_protegida.pdf")
if doc.needs_pass:
    resultado = doc.authenticate("contraseña_aquí")
    if resultado == 0:
        raise ValueError("Contraseña incorrecta o PDF con DRM fuerte")

import pymupdf4llm
md = pymupdf4llm.to_markdown(doc)
```

**Nota**: si el PDF tiene DRM (Adobe DRM, LockedPDF), no es posible extraer texto programáticamente sin autorización del titular.

---

## PDFs muy grandes (>500 páginas)

Procesar en lotes para evitar memory errors:

```python
import pymupdf4llm
from pathlib import Path

def convert_large_pdf(path: str, batch_size: int = 50) -> str:
    import pymupdf
    doc = pymupdf.open(path)
    total = doc.page_count
    doc.close()
    
    parts = []
    for start in range(0, total, batch_size):
        end = min(start + batch_size, total)
        pages = list(range(start, end))
        chunk = pymupdf4llm.to_markdown(path, pages=pages, show_progress=True)
        parts.append(chunk)
        print(f"  Lote {start}-{end} / {total} ✓")
    
    return "\n\n".join(parts)

md = convert_large_pdf("codigo_civil.pdf", batch_size=100)
Path("codigo_civil.md").write_text(md, encoding="utf-8")
```

---

## Tablas problemáticas

### Tablas sin bordes visibles
```python
md = pymupdf4llm.to_markdown("ley.pdf", table_strategy="text_as_image")
# Las tablas se capturan como imagen embed, no como Markdown
```

### Tablas que se parten entre páginas
Solución: post-procesar el Markdown para unir fragmentos de tabla:
```python
import re

def merge_split_tables(text: str) -> str:
    """Une tablas Markdown partidas por separadores de página."""
    # Patrón: fin de tabla (| ... |), luego --- (separador de página), luego inicio de tabla
    pattern = re.compile(
        r"(\|[^\n]+\|)\n\n---\n\n(\|[^\n]+\|)",
        re.MULTILINE
    )
    while pattern.search(text):
        text = pattern.sub(r"\1\n\2", text)
    return text
```

---

## Rendimiento esperado

| Tipo de PDF | Páginas | Tiempo aprox. |
|---|---|---|
| Texto digital simple | 100 | ~3 segundos |
| Texto digital complejo (tablas) | 100 | ~8 segundos |
| Escaneado con RapidOCR | 100 | ~45 segundos |
| Escaneado con Tesseract 300dpi | 100 | ~3 minutos |

Hardware de referencia: CPU 4 núcleos, 8GB RAM.
