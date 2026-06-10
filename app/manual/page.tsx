'use client';

import React from 'react';
import Link from 'next/link';

const Code: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <code className={`bg-macos-muted px-2 py-0.5 rounded text-xs text-macos-blue font-mono ${className ?? ''}`}>{children}</code>
);

const CodeBlock: React.FC<{ children: React.ReactNode; lang?: string }> = ({ children, lang }) => (
  <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] overflow-hidden my-3 shadow-macos-sm">
    {lang && (
      <div className="px-4 py-1.5 bg-macos-muted/50 border-b border-macos-border text-[10px] text-macos-muted-fg font-semibold uppercase tracking-wider">
        {lang}
      </div>
    )}
    <pre className="p-4 text-xs text-macos-card-fg font-mono whitespace-pre-wrap overflow-x-auto">{children}</pre>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-sm font-bold text-macos-card-fg mb-3">{title}</h2>
    <div className="space-y-2 text-xs text-macos-muted-fg leading-relaxed">{children}</div>
  </div>
);

export default function ManualPage() {
  return (
    <main className="min-h-screen bg-macos-bg text-macos-card-fg flex flex-col antialiased">
      <header className="sticky top-0 z-50 glass-sidebar border-b border-macos-border/50 px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[var(--radius-macos)] bg-macos-primary flex items-center justify-center font-bold text-white shadow-macos-sm">
            P
          </div>
          <div>
            <h1 className="text-sm font-bold text-macos-card-fg tracking-tight leading-none">
              PyMuPDF4LLM
            </h1>
            <p className="text-[10px] text-macos-muted-fg font-semibold tracking-wide uppercase mt-0.5">
              Manual de instalación
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-medium text-macos-muted-fg hover:text-macos-primary bg-white/50 hover:bg-macos-muted px-3 py-1.5 rounded-md border border-macos-border transition-all flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al convertidor
        </Link>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        <div className="mb-10 pb-8 border-b border-macos-border">
          <div className="w-12 h-12 rounded-[var(--radius-macos)] bg-macos-accent flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-macos-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-macos-card-fg mb-2">Manual de instalación</h1>
          <p className="text-xs text-macos-muted-fg leading-relaxed max-w-xl">
            Guía paso a paso para instalar y ejecutar PyMuPDF4LLM, el conversor de PDF a Markdown
            optimizado para LLMs, RAG y edición humana.
          </p>
        </div>

        <Section title="Requisitos del sistema">
          <p>Antes de comenzar, asegurate de tener instalado lo siguiente:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4 shadow-macos-sm">
              <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-macos-card-fg mb-0.5">Node.js 18+</p>
              <p className="text-[11px] text-macos-muted-fg">Entorno de ejecución (servidor web + API)</p>
            </div>
            <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4 shadow-macos-sm">
              <div className="w-8 h-8 rounded-md bg-amber-500/10 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <p className="text-xs font-bold text-macos-card-fg mb-0.5">Git</p>
              <p className="text-[11px] text-macos-muted-fg">Para clonar el repositorio</p>
            </div>
          </div>
        </Section>

        <Section title="1. Clonar el repositorio">
          <p>Abrí la terminal y ejecutá:</p>
          <CodeBlock lang="bash">
            git clone https://github.com/julljoll/PyMuPDF4LLM.git{"\n"}
            cd PyMuPDF4LLM
          </CodeBlock>
          <p className="text-macos-muted-fg">
            Tambi&eacute;n pod&eacute;s descargar el ZIP desde{' '}
            <a href="https://github.com/julljoll/PyMuPDF4LLM" target="_blank" rel="noopener noreferrer" className="text-macos-primary hover:underline">
              github.com/julljoll/PyMuPDF4LLM
            </a>
          </p>
        </Section>

        <Section title="2. Instalar dependencias Node.js">
          <p>Este proyecto usa <Code>markitdown-ts</Code> (Microsoft MarkItDown para TypeScript) para la conversión de PDFs. Instalá todo con un solo comando:</p>
          <CodeBlock lang="bash">npm install</CodeBlock>
          <p>Esto instala:</p>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li><Code>markitdown-ts</Code> — Motor de conversi&oacute;n PDF &rarr; Markdown (Microsoft MarkItDown)</li>
            <li><Code>next</Code>, <Code>react</Code> — Framework web</li>
            <li><Code>framer-motion</Code>, <Code>lucide-react</Code> — Animaciones e iconos estilo macOS</li>
            <li><Code>react-markdown</Code>, <Code>remark-gfm</Code> — Renderizado de Markdown</li>
          </ul>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-[var(--radius-macos)] p-4 mt-3">
            <p className="text-xs font-semibold text-amber-600 mb-1">⚠ Error en Windows</p>
            <p className="text-xs text-macos-muted-fg">
              Si PowerShell bloquea la ejecución, usá <Code>{`cmd /c "npm install"`}</Code>.
            </p>
          </div>
        </Section>

        <Section title="3. Iniciar la aplicación">
          <p>Una vez instaladas las dependencias, iniciá el servidor web:</p>
          <CodeBlock lang="bash">npm run dev</CodeBlock>
          <p>Abrí el navegador en{' '}
            <a href="http://localhost:3000" className="text-macos-primary hover:underline">http://localhost:3000</a>.
          </p>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[var(--radius-macos)] p-4 mt-3">
            <p className="text-xs font-semibold text-emerald-600 mb-1">✅ App funcionando</p>
            <p className="text-xs text-macos-muted-fg">
              Vas a ver la interfaz macOS del convertidor: arrastrá un PDF en el panel izquierdo,
              esperá la conversión y obtené el Markdown limpio en el panel derecho.
            </p>
          </div>
        </Section>

        <Section title="Solución de problemas comunes">
          <div className="space-y-3">
            <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4">
              <p className="text-xs font-bold text-macos-card-fg mb-1">El Markdown sale vacío o con muy poco texto</p>
              <p className="text-xs text-macos-muted-fg">
                El PDF puede estar escaneado (imágenes sin texto digital). <Code>markitdown-ts</Code> no puede extraer texto de imágenes.
                Probá con un PDF que tenga texto seleccionable.
              </p>
            </div>
            <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4">
              <p className="text-xs font-bold text-macos-card-fg mb-1">Error &quot;No se pudo extraer texto&quot;</p>
              <p className="text-xs text-macos-muted-fg">
                El PDF puede estar protegido o ser solo imágenes. Verificá que el PDF permita seleccionar texto.
              </p>
            </div>
            <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4">
              <p className="text-xs font-bold text-macos-card-fg mb-1">La app no carga</p>
              <p className="text-xs text-macos-muted-fg">
                Asegurate de que <Code>npm install</Code> se ejecut&oacute; sin errores. Si el puerto 3000 est&aacute; ocupado,
                Next.js asigna otro autom&aacute;ticamente (revis&aacute; la terminal).
              </p>
            </div>
          </div>
        </Section>

        <Section title="Uso desde la terminal (CLI)">
          <p>Tambi&eacute;n pod&eacute;s convertir PDFs directamente desde la terminal:</p>
          <CodeBlock lang="bash">
            curl -X POST http://localhost:3000/api/convert \{"\n"}
              -F &quot;file=@documento.pdf&quot; \{"\n"}
              | jq .markdown &gt; documento.md
          </CodeBlock>
          <p className="text-xs text-macos-muted-fg">
            O ejecut&aacute; los scripts Python si los instalaste aparte:{' '}
            <Code>python scripts/pipeline.py documento.pdf --stdout</Code>
          </p>
        </Section>

        <Section title="Referencias">
          <div className="bg-macos-card border border-macos-border rounded-[var(--radius-macos)] p-4 shadow-macos-sm">
            <p className="text-xs text-macos-muted-fg leading-relaxed">
              Para documentos jur&iacute;dicos complejos (constituciones, c&oacute;digos, leyes), consult&aacute; la gu&iacute;a
              de estructura legal en{' '}
              <Code>RAG/pdf-ley-a-md/references/legal-structure.md</Code> y la gu&iacute;a de
              soluci&oacute;n de problemas en{' '}
              <Code>RAG/pdf-ley-a-md/references/troubleshooting.md</Code>.
            </p>
          </div>
        </Section>

        <div className="mt-10 pt-6 border-t border-macos-border text-center">
          <p className="text-[11px] text-macos-muted-fg">
            PyMuPDF4LLM — Conversor PDF a Markdown con markitdown-ts
          </p>
        </div>
      </div>
    </main>
  );
}
