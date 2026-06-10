# PyMuPDF4LLM — PDF a Markdown para LLMs

Convierte documentos PDF (leyes, decretos, informes técnicos, documentos escaneados) a Markdown limpio y estructurado, optimizado para consumo por LLMs, RAG, bases de conocimiento y edición humana.

## Pipeline

```
📄 PDF  →  📊 analyze_pdf.py  →  🔄 convert_law.py  →  🧹 clean_legal_md.py  →  📝 Markdown
```

### Uso rápido

```bash
pip install -r requirements.txt
python scripts/pipeline.py documento.pdf [directorio_salida]
```

### Scripts individuales

| Script | Propósito |
|---|---|
| `scripts/analyze_pdf.py` | Analiza estructura: columnas, OCR, tamaño de fuente |
| `scripts/convert_law.py` | Convierte PDF → Markdown con PyMuPDF4LLM |
| `scripts/clean_legal_md.py` | Limpia artefactos legales, normaliza artículos/capítulos |
| `scripts/pipeline.py` | Pipeline completo (análisis → conversión → limpieza) |

### Parámetros clave de conversión

| Parámetro | Recomendado | Uso |
|---|---|---|
| `table_strategy` | `lines_strict` | `lines` para tablas complejas |
| `margins` | `(36, 54, 36, 54)` | Aumentar si hay encabezados/pies de página |
| `ignore_graphics` | `True` | Ignorar logos y sellos decorativos |
| `force_text` | `True` | Extraer texto sobre imágenes de fondo |
| `ignore_alpha` | `True` | Eliminar marcas de agua |
| `dpi` | `150` | `300` para imágenes de alta calidad |

### Referencias

- `RAG/pdf-ley-a-md/references/legal-structure.md` — Jerarquía de documentos jurídicos
- `RAG/pdf-ley-a-md/references/troubleshooting.md` — Solución de problemas (OCR, encoding, protección)

### Documentos escaneados (OCR)

```bash
pip install rapidocr-onnxruntime
```

```python
import pymupdf4llm
md = pymupdf4llm.to_markdown("documento.pdf", ocr=True)
```

---

**Framework:** PyMuPDF4LLM + Next.js (dashboard web en `/app`)
