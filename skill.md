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

## Flujo de trabajo

```
1. INSTALAR dependencias  →  pip install -r requirements.txt
2. ANALIZAR el PDF       →  python scripts/analyze_pdf.py <pdf>
3. CONVERTIR             →  python scripts/convert_law.py <pdf>
4. LIMPIAR               →  python scripts/clean_legal_md.py <md>
5. PIPELINE COMPLETO     →  python scripts/pipeline.py <pdf> [salida]
```

## Referencias

- `RAG/pdf-ley-a-md/references/legal-structure.md` — Estructura legal compleja
- `RAG/pdf-ley-a-md/references/troubleshooting.md` — Problemas de calidad/OCR

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

## Verificación de calidad

- [ ] Los artículos tienen el formato `### Artículo N —`
- [ ] No hay números de página sueltos
- [ ] Las tablas están en sintaxis Markdown válida (`|---|`)
- [ ] No hay líneas de guiones o puntos (artefactos de TOC)
- [ ] El frontmatter YAML está presente
- [ ] Encoding correcto (tildes y ñ visibles sin escapes)
