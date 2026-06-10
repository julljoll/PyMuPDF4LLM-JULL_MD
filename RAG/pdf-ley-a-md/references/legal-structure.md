# Referencia: Estructura de Documentos Jurídicos

## Jerarquía estándar en legislación hispanohablante

```
Constitución / Código
└── Libro (LIBRO I, II...)
    └── Título (TÍTULO I, II...)
        └── Capítulo (CAPÍTULO I, II...)
            └── Sección (SECCIÓN 1ª, 2ª...)
                └── Artículo (Art. 1, 2...)
                    └── Numeral (1., 2., 3.)
                        └── Literal (a), b), c))
                            └── Inciso (párrafo sin número)
```

### Mapeo a encabezados Markdown

| Nivel legal | Markdown | Regex de detección |
|---|---|---|
| Libro | `# Libro N` | `^LIBRO\s+[IVXLC]+` |
| Título | `# Título N` | `^TÍTULO\s+[IVXLC]+` |
| Capítulo | `## Capítulo N` | `^CAPÍTULO\s+[IVXLC]+` |
| Sección | `## Sección N` | `^SECCIÓN\s+\d+` |
| Artículo | `### Artículo N` | `^Art[íi]culo\.?\s+\d+` |
| Numeral | `1.` (lista) | `^\d+\.\s` |
| Literal | `a)` (lista) | `^[a-z]\)\s` |

---

## Tipos de documentos y estrategias

### Ley ordinaria / Ley orgánica
- Estructura: Título → Capítulo → Artículo
- `table_strategy`: `"lines_strict"`
- Riesgo: encabezados de página ("LEY N° 20.123 — ARTÍCULO 5") que contaminan el texto
- Solución: `margins=(36, 60, 36, 60)` para un margen superior generoso

### Código (Civil, Penal, Comercio)
- Estructura larga: Libro → Título → Capítulo → Artículo
- Procesar por lotes si >500 páginas: `pages=range(0,100)`
- Alto riesgo de notas marginales en el margen izquierdo
- Solución: `margins=(80, 54, 36, 54)` (margen izquierdo amplio)

### Decreto Supremo / Decreto Reglamentario
- Sin estructura de Libro/Título; directo a Artículos
- Incluye vistos y considerandos antes del articulado
- Preservar el bloque de vistos como párrafo, no como encabezado

### Resolución / Circular / Instrucción
- Estructura plana; numeración por punto (1., 1.1., 1.1.1.)
- `table_strategy`: `"lines"` (frecuentes tablas de datos)

### Diario Oficial / Boletín
- Multi-columna casi siempre
- `margins=(72, 72, 72, 72)`, `multi_column=True`
- Separar cada ley por su número antes de procesar

### Tratado Internacional
- Puede tener idioma paralelo (columnas español/inglés)
- Procesar solo páginas en español o extraer columna izquierda

---

## Patrones problemáticos comunes

### Artículos con texto interrumpido por salto de página
```
### Artículo 15 — Obligaciones del empleador

El empleador deberá proporcionar a los trabajadores los elementos
de protección personal adecuados al trabajo que realizan y

---  ← separador de página

mantenerlos en perfecto estado de funcionamiento...
```
**Solución**: post-procesar uniendo párrafos separados por `---` si la línea anterior no termina con punto.

### Notas al pie con número superíndice
```
El contrato deberá firmarse ante notario^1^

---
^1^ Ley 19.880, Art. 5°
```
**Solución**: el script `clean_legal_md.py` convierte a `[^1]` y agrega sección de referencias.

### Tablas de aranceles / tarifas
Usar `table_strategy="lines"` y verificar manualmente con:
```python
import pymupdf
doc = pymupdf.open("ley.pdf")
page = doc[N]
tables = page.find_tables()
print(f"Página {N}: {len(tables.tables)} tablas encontradas")
```

### Texto en imágenes (sellos, rúbricas, cuadros de texto)
- PyMuPDF4LLM los ignora con `ignore_images=True`
- Si son relevantes: `embed_images=True` y revisar manualmente

---

## Validación de articulado

Script para verificar que todos los artículos fueron capturados:

```python
import re, sys
from pathlib import Path

def validate_articles(md_path: str, expected_last: int = None):
    text = Path(md_path).read_text(encoding="utf-8")
    articles = re.findall(r"### Artículo (\d+)", text)
    nums = [int(n) for n in articles]
    
    print(f"Artículos encontrados: {len(nums)}")
    if nums:
        print(f"  Primero: {min(nums)}, Último: {max(nums)}")
    
    # Detectar saltos
    missing = []
    for i in range(min(nums), max(nums)+1):
        if i not in nums:
            missing.append(i)
    
    if missing:
        print(f"  ⚠ Artículos posiblemente faltantes: {missing[:10]}")
    else:
        print("  ✓ Secuencia de artículos continua")
    
    if expected_last and max(nums) != expected_last:
        print(f"  ⚠ Se esperaba hasta Art. {expected_last}, se encontró hasta Art. {max(nums)}")

if __name__ == "__main__":
    validate_articles(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else None)
```
