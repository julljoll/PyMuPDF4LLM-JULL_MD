---
name: pdf-ley-a-md
description: >
  Crea una aplicación Next.js + Node.js con diseño macOS/Apple para convertir leyes, decretos,
  reglamentos y documentos jurídicos desde PDF a Markdown usando MarkItDown (Microsoft).
  Úsalo SIEMPRE que el usuario mencione: convertir ley a markdown, PDF de ley, decreto en PDF,
  reglamento PDF, documento jurídico a .md, ley a texto, norma en PDF, código civil PDF,
  constitución PDF, aplicación legal, app de leyes, o cualquier combinación de documento legal +
  conversión + markdown/texto + Next.js/Node.js/app. También activa cuando el usuario quiera
  una interfaz para procesar PDFs legales, RAG jurídico, o base de conocimiento legal.
  Prioriza diseño estilo macOS Apple: vidrioso, minimalista, SF Pro, fondos difusos.
---

# Skill: App Next.js — PDF de Ley → Markdown (estilo macOS)

Genera una aplicación Next.js 14 completa con App Router, diseño Apple/macOS, y conversión
de PDFs legales a Markdown usando `markitdown-ts` (port TypeScript de Microsoft MarkItDown).

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14+ App Router |
| Lenguaje | TypeScript |
| Conversión PDF | `markitdown-ts` (Microsoft MarkItDown para Node.js) |
| Estilos | Tailwind CSS 3.4 + CSS variables |
| Componentes | shadcn/ui (base accesible) |
| Upload | API Route Next.js + `formidable` |
| Preview Markdown | `react-markdown` + `remark-gfm` |
| Animaciones | Framer Motion |
| Fuente | `next/font` → SF Pro / Inter system |

---

## Flujo de trabajo para crear la app

```
1. SCAFFOLD → npx create-next-app con TypeScript + Tailwind
2. INSTALAR dependencias específicas
3. CREAR tokens de diseño macOS (CSS variables + tailwind.config)
4. CREAR componentes UI (Window, Sidebar, DropZone, PreviewPane)
5. CREAR API Route /api/convert (recibe PDF, devuelve Markdown)
6. CREAR página principal con layout de 3 paneles
7. VERIFICAR estructura de archivos
```

---

## Paso 1 — Scaffold del proyecto

```bash
npx create-next-app@latest ley-a-md \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd ley-a-md
```

---

## Paso 2 — Instalar dependencias

```bash
# Conversión PDF → Markdown (MarkItDown para TypeScript/Node.js)
npm install markitdown-ts

# Manejo de uploads multipart en API Routes
npm install formidable
npm install -D @types/formidable

# Render de Markdown en cliente
npm install react-markdown remark-gfm rehype-highlight

# Animaciones estilo macOS
npm install framer-motion

# Iconos (estilo SF Symbols aproximado)
npm install lucide-react

# shadcn/ui (ejecutar después del scaffold)
npx shadcn@latest init
# Cuando pregunte: usar CSS variables = Yes, base color = Slate

# Componentes shadcn necesarios
npx shadcn@latest add button badge progress separator tooltip
```

---

## Paso 3 — Sistema de diseño macOS

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Paleta macOS Sonoma/Sequoia */
    --background: 0 0% 96%;           /* #F5F5F5 - fondo ventana */
    --foreground: 0 0% 10%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;
    --primary: 211 100% 50%;          /* Azul sistema macOS #007AFF */
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 91%;
    --secondary-foreground: 0 0% 20%;
    --muted: 0 0% 94%;
    --muted-foreground: 0 0% 45%;
    --accent: 211 100% 95%;
    --accent-foreground: 211 100% 30%;
    --border: 0 0% 86%;
    --input: 0 0% 91%;
    --ring: 211 100% 50%;
    --radius: 0.75rem;                /* Border radius macOS */

    /* macOS específico */
    --macos-sidebar: rgba(246, 246, 246, 0.85);
    --macos-toolbar: rgba(255, 255, 255, 0.72);
    --macos-glass: rgba(255, 255, 255, 0.6);
    --macos-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08);
    --macos-shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
    --macos-blue: #007AFF;
    --macos-green: #34C759;
    --macos-red: #FF3B30;
    --macos-yellow: #FFCC00;
    --macos-gray: #8E8E93;
  }

  .dark {
    --background: 0 0% 8%;            /* #141414 - dark macOS */
    --foreground: 0 0% 95%;
    --card: 0 0% 12%;
    --card-foreground: 0 0% 95%;
    --primary: 211 100% 58%;
    --secondary: 0 0% 16%;
    --secondary-foreground: 0 0% 80%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --border: 0 0% 22%;
    --input: 0 0% 18%;
    --macos-sidebar: rgba(28, 28, 30, 0.85);
    --macos-toolbar: rgba(44, 44, 46, 0.72);
    --macos-glass: rgba(40, 40, 42, 0.6);
    --macos-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
  }

  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
                 "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

/* Efecto vidrio macOS (Vibrancy simulado) */
.glass {
  background: var(--macos-glass);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.3);
}

.glass-sidebar {
  background: var(--macos-sidebar);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
}

/* Scrollbar estilo macOS */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.2);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.35); }
```

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "2rem" },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // Colores macOS nativos
        "macos-blue":   "#007AFF",
        "macos-green":  "#34C759",
        "macos-red":    "#FF3B30",
        "macos-yellow": "#FFCC00",
        "macos-gray":   "#8E8E93",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "macos": "10px",
        "macos-lg": "16px",
      },
      boxShadow: {
        "macos": "var(--macos-shadow)",
        "macos-sm": "var(--macos-shadow-sm)",
        "macos-inset": "inset 0 1px 0 rgba(255,255,255,0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "bounce-sm": "bounceSm 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSm: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

---

## Paso 4 — Componentes UI macOS

### `src/components/MacWindow.tsx`
Ventana principal con barra de título y botones semáforo:

```tsx
"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MacWindowProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function MacWindow({ title, children, className }: MacWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col rounded-macos-lg overflow-hidden",
        "shadow-macos border border-border/50",
        "bg-background",
        className
      )}
    >
      {/* Barra de título estilo macOS */}
      <div className="flex items-center gap-2 px-4 py-3 glass-sidebar border-b border-border/50 select-none">
        {/* Botones semáforo */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-macos-red hover:brightness-90 cursor-pointer transition-all" />
          <div className="w-3 h-3 rounded-full bg-macos-yellow hover:brightness-90 cursor-pointer transition-all" />
          <div className="w-3 h-3 rounded-full bg-macos-green hover:brightness-90 cursor-pointer transition-all" />
        </div>
        {/* Título centrado */}
        <span className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </motion.div>
  )
}
```

### `src/components/DropZone.tsx`
Zona de arrastre de PDFs con animación:

```tsx
"use client"
import { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Upload, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropZoneProps {
  onFile: (file: File) => void
  isConverting: boolean
}

export function DropZone({ onFile, isConverting }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type === "application/pdf") {
      setFileName(file.name)
      onFile(file)
    }
  }, [onFile])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      onFile(file)
    }
  }, [onFile])

  return (
    <label
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-full min-h-[220px] rounded-macos cursor-pointer",
        "border-2 border-dashed transition-all duration-200",
        isDragging
          ? "border-macos-blue bg-accent scale-[1.01]"
          : "border-border hover:border-macos-blue/50 hover:bg-muted/50",
        isConverting && "pointer-events-none opacity-60"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf"
        className="sr-only"
        onChange={handleInput}
        disabled={isConverting}
      />

      <AnimatePresence mode="wait">
        {fileName ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-macos bg-accent flex items-center justify-center">
              <FileText className="w-7 h-7 text-macos-blue" />
            </div>
            <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
              {fileName}
            </span>
            <span className="text-xs text-muted-foreground">
              {isConverting ? "Convirtiendo…" : "Haz clic para cambiar archivo"}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-14 h-14 rounded-macos bg-muted flex items-center justify-center">
              <Upload className="w-7 h-7 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Arrastra tu PDF aquí</p>
              <p className="text-xs text-muted-foreground mt-1">
                o haz clic para seleccionar • Solo PDF
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  )
}
```

### `src/components/MarkdownPreview.tsx`
Panel derecho con render del Markdown convertido:

```tsx
"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { motion } from "framer-motion"
import { Copy, Download, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MarkdownPreviewProps {
  content: string
  filename?: string
}

export function MarkdownPreview({ content, filename }: MarkdownPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename?.replace(".pdf", ".md") ?? "documento.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Barra de herramientas */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 glass-sidebar">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Vista previa Markdown
        </span>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-xs"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-macos-green" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="ml-1.5">{copied ? "Copiado" : "Copiar"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-7 px-2 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="ml-1.5">Exportar .md</span>
          </Button>
        </div>
      </div>

      {/* Contenido renderizado */}
      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 prose prose-sm dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
            prose-table:text-xs prose-code:text-xs
            prose-a:text-macos-blue"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  )
}
```

---

## Paso 5 — API Route de conversión

### `src/app/api/convert/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server"
import { MarkItDown } from "markitdown-ts"
import { writeFile, unlink, mkdir } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"
import { randomUUID } from "crypto"

const converter = new MarkItDown()

export async function POST(req: NextRequest) {
  let tempPath: string | null = null

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Solo se aceptan archivos PDF" }, { status: 400 })
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "El archivo excede el límite de 50 MB" }, { status: 413 })
    }

    // Guardar PDF en temp para que markitdown-ts lo lea
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tmpDir = join(tmpdir(), "ley-a-md")
    await mkdir(tmpDir, { recursive: true })
    tempPath = join(tmpDir, `${randomUUID()}.pdf`)
    await writeFile(tempPath, buffer)

    // Convertir con MarkItDown
    const result = await converter.convert(tempPath)
    const markdown = result?.markdown ?? ""

    if (!markdown.trim()) {
      return NextResponse.json(
        { error: "No se pudo extraer texto del PDF. Puede ser un documento escaneado." },
        { status: 422 }
      )
    }

    // Post-procesado: limpieza de artefactos legales
    const cleaned = cleanLegalMarkdown(markdown)

    return NextResponse.json({
      markdown: cleaned,
      chars: cleaned.length,
      words: cleaned.split(/\s+/).length,
    })

  } catch (err) {
    console.error("[/api/convert] Error:", err)
    return NextResponse.json(
      { error: "Error interno durante la conversión" },
      { status: 500 }
    )
  } finally {
    // Limpiar archivo temporal
    if (tempPath) {
      await unlink(tempPath).catch(() => {})
    }
  }
}

// ── Limpieza post-conversión para documentos jurídicos ──────────────────────

function cleanLegalMarkdown(text: string): string {
  // Eliminar números de página sueltos
  text = text.replace(/^\s*[-–—]?\s*\d{1,4}\s*[-–—]?\s*$/gm, "")

  // Unir palabras partidas con guión
  text = text.replace(/(\w{3,})-\n(\w{3,})/gu, "$1$2")

  // Normalizar Artículos → ### Artículo N
  text = text.replace(
    /^(ARTÍCULO|Artículo|Art\.?)\s*(\d+[\.\-°]?)\s*[\.–\-]?\s*/gim,
    "\n### Artículo $2 — "
  )

  // Normalizar Títulos y Capítulos → # / ##
  text = text.replace(
    /^(TÍTULO|CAPÍTULO|SECCIÓN|LIBRO|PARTE)\s+([IVXLCDM]+|\d+)\b/gim,
    (_, kw, num) => {
      const k = kw[0].toUpperCase() + kw.slice(1).toLowerCase()
      const level = ["Título","Libro","Parte"].includes(k) ? "#" : "##"
      return `\n${level} ${k} ${num}`
    }
  )

  // Eliminar líneas de puntos (TOC residual)
  text = text.replace(/^.+\.{4,}\s*\d+\s*$/gm, "")

  // Limpiar espacios múltiples
  text = text.replace(/[ \t]{2,}/g, " ")

  // Reducir líneas en blanco excesivas
  text = text.replace(/\n{3,}/g, "\n\n")

  // Añadir frontmatter
  const date = new Date().toISOString().split("T")[0]
  const frontmatter = `---\nconverted: "${date}"\ntool: "markitdown-ts"\n---\n\n`

  return frontmatter + text.trim()
}

// Aumentar el tamaño máximo del body para PDFs grandes
export const config = {
  api: { bodyParser: false },
}
```

---

## Paso 6 — Página principal

### `src/app/page.tsx`

```tsx
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MacWindow } from "@/components/MacWindow"
import { DropZone } from "@/components/DropZone"
import { MarkdownPreview } from "@/components/MarkdownPreview"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Sparkles, AlertCircle } from "lucide-react"

export default function Home() {
  const [markdown, setMarkdown] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<{ chars: number; words: number } | null>(null)
  const [currentFile, setCurrentFile] = useState<string | undefined>()

  const handleFile = async (file: File) => {
    setIsConverting(true)
    setError(null)
    setMarkdown("")
    setStats(null)
    setCurrentFile(file.name)

    try {
      const form = new FormData()
      form.append("file", file)

      const res = await fetch("/api/convert", {
        method: "POST",
        body: form,
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Error desconocido")
        return
      }

      setMarkdown(data.markdown)
      setStats({ chars: data.chars, words: data.words })
    } catch {
      setError("Error de red. Verifica tu conexión.")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    /* Fondo degradado estilo macOS */
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100
                    dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900
                    flex items-center justify-center p-6">
      <MacWindow
        title="Ley a Markdown — Conversor Jurídico"
        className="w-full max-w-6xl min-h-[700px]"
      >
        <div className="flex flex-1 overflow-hidden">

          {/* ─── Panel izquierdo: Upload ──────────────────────── */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-4 p-5 border-r border-border/50 glass-sidebar">
            {/* Logo / Título */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-macos bg-macos-blue flex items-center justify-center shadow-macos-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-tight">Ley a Markdown</h1>
                <p className="text-xs text-muted-foreground">Powered by MarkItDown</p>
              </div>
            </div>

            <Separator />

            {/* Drop Zone */}
            <DropZone onFile={handleFile} isConverting={isConverting} />

            {/* Estado de conversión */}
            <AnimatePresence>
              {isConverting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Sparkles className="w-4 h-4 text-macos-blue animate-pulse" />
                  Procesando documento…
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 rounded-macos bg-red-50 dark:bg-red-950/30
                             border border-red-200 dark:border-red-800"
                >
                  <AlertCircle className="w-4 h-4 text-macos-red mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Estadísticas */}
            {stats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-1.5"
              >
                <Badge variant="secondary" className="text-xs">
                  {stats.chars.toLocaleString()} caracteres
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {stats.words.toLocaleString()} palabras
                </Badge>
                <Badge className="text-xs bg-macos-green/10 text-macos-green border-0">
                  Convertido ✓
                </Badge>
              </motion.div>
            )}

            <Separator />

            {/* Info */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">Soportado</p>
              <p>• Leyes y decretos</p>
              <p>• Reglamentos</p>
              <p>• Códigos jurídicos</p>
              <p>• Resoluciones</p>
              <p className="pt-2 text-[10px]">Máx. 50 MB por archivo</p>
            </div>
          </div>

          {/* ─── Panel derecho: Preview ───────────────────────── */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {markdown ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <MarkdownPreview content={markdown} filename={currentFile} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center gap-3
                             text-muted-foreground"
                >
                  <div className="w-16 h-16 rounded-macos-lg bg-muted flex items-center justify-center">
                    <FileText className="w-8 h-8 opacity-40" />
                  </div>
                  <p className="text-sm">Sube un PDF para ver el Markdown</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </MacWindow>
    </div>
  )
}
```

---

## Paso 7 — `next.config.ts`

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Aumentar límite de body para PDFs grandes
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  // Excluir markitdown-ts del bundle del cliente (solo servidor)
  serverExternalPackages: ["markitdown-ts"],
}

export default nextConfig
```

---

## Estructura de archivos final

```
ley-a-md/
├── src/
│   ├── app/
│   │   ├── api/convert/route.ts   ← API de conversión
│   │   ├── globals.css            ← Tokens macOS
│   │   ├── layout.tsx             ← Layout raíz
│   │   └── page.tsx               ← Página principal
│   ├── components/
│   │   ├── MacWindow.tsx          ← Ventana con semáforo
│   │   ├── DropZone.tsx           ← Drag & drop PDF
│   │   ├── MarkdownPreview.tsx    ← Panel de resultado
│   │   └── ui/                    ← Componentes shadcn
│   └── lib/
│       └── utils.ts               ← cn() helper
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Comandos de desarrollo

```bash
# Desarrollo
npm run dev          # http://localhost:3000

# Producción
npm run build
npm start

# Verificar tipos
npx tsc --noEmit
```

---

## Notas importantes para VS Code

1. **markitdown-ts solo corre en Node.js (servidor)**. Nunca importarlo en Client Components (`"use client"`).
2. El `route.ts` de la API ya maneja el archivo en temp y lo elimina después.
3. Si `markitdown-ts` no puede extraer texto (PDF escaneado), devuelve string vacío → el API devuelve 422 con mensaje descriptivo.
4. Para PDFs muy pesados (>20 MB), considerar streaming con `ReadableStream` en la API Route.
5. El diseño usa `backdrop-filter: blur()` — requiere Chrome 76+, Safari 9+, Firefox 103+. Para IE/Edge antiguo, el fallback es fondo opaco (ya incluido en los estilos).

Leer `references/markitdown-api.md` para detalles de la API de markitdown-ts.
Leer `references/macos-design.md` para patrones de diseño Apple adicionales.
