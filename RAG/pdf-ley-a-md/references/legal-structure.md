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
```

### Mapeo a Markdown

| Nivel legal | Markdown |
|---|---|
| Libro / Título / Parte | `# Libro N` |
| Capítulo / Sección | `## Capítulo N` |
| Artículo | `### Artículo N — Título` |
| Numeral | `1.` (lista ordenada) |
| Literal | `a)` |

---

## Tipos de documento y ajustes en `cleanLegalMarkdown()`

### Ley ordinaria / Decreto
- Estructura: Título → Capítulo → Artículo
- La función base de `route.ts` cubre este caso sin modificación.

### Código (Civil, Penal, Comercio)
- Añadir regex de Libro antes del de Título:
```ts
text = text.replace(
  /^LIBRO\s+([IVXLCDM]+|\d+)\b/gim,
  "\n# Libro $1"
)
```

### Diario Oficial / Boletín
- markitdown-ts puede mezclar columnas. Si el texto está desordenado,
  pre-procesar el PDF con `pdf-parse` para extraer solo la columna de texto principal.

### Resolución / Circular
- Numeración por punto (1., 1.1.). Añadir:
```ts
text = text.replace(
  /^(\d+\.\d+(?:\.\d+)?)\s+/gm,
  "\n#### $1 "
)
```

---

## Regex de detección rápida (para el API route)

```ts
// Detectar tipo de documento desde el Markdown extraído
function detectDocType(text: string): string {
  if (/^(CONSTITUCIÓN|CONSTITUCÍON)/im.test(text)) return "constitución"
  if (/^(CÓDIGO|CODIGO)\s+(CIVIL|PENAL|COMERCIO)/im.test(text)) return "código"
  if (/^LEY\s+(N[°oº]?\.?\s*)?\d+/im.test(text)) return "ley"
  if (/^DECRETO\s+(SUPREMO|EJECUTIVO|LEY)/im.test(text)) return "decreto"
  if (/^RESOLUCIÓN/im.test(text)) return "resolución"
  if (/^REGLAMENTO/im.test(text)) return "reglamento"
  return "documento jurídico"
}
```

---

## Validación de articulado (TypeScript)

```ts
function validateArticles(markdown: string): {
  found: number[]
  missing: number[]
  lastArticle: number
} {
  const matches = [...markdown.matchAll(/### Artículo (\d+)/g)]
  const nums = matches.map(m => parseInt(m[1])).sort((a, b) => a - b)

  const missing: number[] = []
  for (let i = nums[0]; i <= nums[nums.length - 1]; i++) {
    if (!nums.includes(i)) missing.push(i)
  }

  return {
    found: nums,
    missing,
    lastArticle: nums[nums.length - 1] ?? 0,
  }
}
```

Usar en la API route para añadir metadata de validación al response:
```ts
return NextResponse.json({
  markdown: cleaned,
  chars: cleaned.length,
  words: cleaned.split(/\s+/).length,
  validation: validateArticles(cleaned),  // opcional
})
```
