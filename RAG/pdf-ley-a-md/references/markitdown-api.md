# Referencia: markitdown-ts API

## Instalación y versiones

```bash
npm install markitdown-ts          # TypeScript port de Microsoft MarkItDown
# alternativa más ligera:
npm install @mote-software/markitdown  # binario precompilado, sin Python
```

## API básica (markitdown-ts)

```ts
import { MarkItDown } from "markitdown-ts"

const converter = new MarkItDown()

// Convertir desde ruta de archivo
const result = await converter.convert("./ley.pdf")
console.log(result.markdown)      // string con el Markdown

// Convertir desde Buffer (para serverless, sin escribir a disco)
const result = await converter.convertBuffer(buffer, { file_extension: "pdf" })

// Convertir desde URL remota
const result = await converter.convert("https://ejemplo.com/ley.pdf")
```

## Objeto resultado

```ts
interface ConversionResult {
  markdown: string        // Contenido Markdown extraído
  title: string | null    // Título del documento si está disponible
}
```

## Formatos soportados por markitdown-ts

| Formato | Extensión | Notas |
|---|---|---|
| PDF | `.pdf` | Texto digital; escaneados requieren OCR externo |
| Word | `.docx` | Incluye tablas y listas |
| PowerPoint | `.pptx` | Slide por slide |
| Excel | `.xlsx` | Tablas Markdown |
| HTML | `.html` | Limpia etiquetas |
| CSV | `.csv` | Tabla Markdown |
| JSON | `.json` | Bloque de código |
| XML / RSS | `.xml`, `.rss` | Estructura de árbol |
| Imágenes | `.png`, `.jpg` | Requiere Tesseract instalado |

## Alternativa: @mote-software/markitdown (binario)

Más rápido de instalar, sin dependencias Python:

```ts
import { runMarkitdown } from "@mote-software/markitdown"

// Síncrono, devuelve string
const markdown = runMarkitdown("./ley.pdf")
```

Desventaja: no soporta `convertBuffer`, requiere ruta en disco.

## Manejo de errores comunes

```ts
try {
  const result = await converter.convert(filePath)
  if (!result?.markdown?.trim()) {
    // PDF escaneado o protegido
    throw new Error("PDF sin texto extraíble")
  }
} catch (err) {
  if (err instanceof Error) {
    if (err.message.includes("password")) {
      // PDF con contraseña
    }
    if (err.message.includes("ENOENT")) {
      // Archivo no encontrado
    }
  }
}
```

## Rendimiento esperado (markitdown-ts)

| Tamaño PDF | Tiempo aprox. |
|---|---|
| < 1 MB (10-20 páginas) | ~0.5s |
| 5 MB (50-100 páginas) | ~2-4s |
| 20 MB (200+ páginas) | ~10-20s |
| > 50 MB | Considerar procesamiento por chunks |

## Notas de despliegue

- **Vercel**: compatible. Usar `serverExternalPackages: ["markitdown-ts"]` en `next.config.ts`.
- **Docker**: incluir Node.js 18+. No requiere Python.
- **Edge Runtime**: NO compatible (requiere Node.js APIs como `fs`). Usar Node.js runtime.
- **Next.js API Routes**: siempre usar `export const runtime = "nodejs"` si hay conflicto.
