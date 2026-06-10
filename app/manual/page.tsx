'use client';

import React from 'react';
import Link from 'next/link';

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="bg-apple-input px-2 py-0.5 rounded text-[11px] text-apple-blue font-mono">{children}</code>
);

const CodeBlock: React.FC<{ children: React.ReactNode; lang?: string }> = ({ children, lang }) => (
  <div className="bg-apple-bg border border-apple-border rounded-xl overflow-hidden my-3">
    {lang && (
      <div className="px-4 py-1.5 bg-apple-input/30 border-b border-apple-border text-[9px] text-apple-text-tertiary font-semibold uppercase tracking-wider">
        {lang}
      </div>
    )}
    <pre className="p-4 text-xs text-apple-text font-mono whitespace-pre-wrap overflow-x-auto">{children}</pre>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-sm font-bold text-white mb-3 flex items-center">{title}</h2>
    <div className="space-y-2 text-xs text-apple-text leading-relaxed">{children}</div>
  </div>
);

export default function ManualPage() {
  return (
    <main className="min-h-screen bg-apple-bg text-apple-text flex flex-col antialiased">
      <header className="apple-header px-8 py-3.5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-apple-blue flex items-center justify-center font-bold text-white shadow-lg shadow-apple-blue/20">
              P
            </div>
            <div>
              <h1 className="text-sm font-bold text-apple-text tracking-tight leading-none">
                PyMuPDF4LLM
              </h1>
              <p className="text-[9px] text-apple-text-secondary font-semibold tracking-wide uppercase mt-1">
                Manual de instalación
              </p>
            </div>
          </Link>
        </div>

        <Link
          href="/"
          className="text-[10px] font-semibold text-apple-text-secondary hover:text-apple-blue bg-apple-input/50 hover:bg-apple-input px-3 py-1.5 rounded-lg border border-apple-border transition-all flex items-center space-x-1.5"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Volver al convertidor</span>
        </Link>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {/* Portada del manual */}
        <div className="mb-10 pb-8 border-b border-apple-border">
          <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Manual de instalación</h1>
          <p className="text-xs text-apple-text-secondary leading-relaxed max-w-xl">
            Guía paso a paso para instalar y ejecutar PyMuPDF4LLM, el conversor de PDF a Markdown
            optimizado para LLMs, RAG y edición humana.
          </p>
        </div>

        {/* Requisitos */}
        <Section title="Requisitos del sistema">
          <p>Antes de comenzar, asegurate de tener instalado lo siguiente:</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
              </div>
              <p className="text-[11px] font-bold text-white mb-0.5">Python 3.10+</p>
              <p className="text-[10px] text-apple-text-secondary">Lenguaje de los scripts de conversión</p>
            </div>
            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-apple-blue/10 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[11px] font-bold text-white mb-0.5">Node.js 18+</p>
              <p className="text-[10px] text-apple-text-secondary">Entorno de la interfaz web</p>
            </div>
            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <p className="text-[11px] font-bold text-white mb-0.5">Git</p>
              <p className="text-[10px] text-apple-text-secondary">Para clonar el repositorio</p>
            </div>
          </div>
        </Section>

        {/* Paso 1 */}
        <Section title="1. Clonar el repositorio">
          <p>Abrí la terminal (PowerShell, CMD o terminal) y ejecutá:</p>
          <CodeBlock lang="bash">
            git clone https://github.com/julljoll/PyMuPDF4LLM.git{"\n"}
            cd PyMuPDF4LLM
          </CodeBlock>
          <p className="text-apple-text-tertiary">
            También podés descargar el ZIP desde{' '}
            <a href="https://github.com/julljoll/PyMuPDF4LLM" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:underline">
              github.com/julljoll/PyMuPDF4LLM
            </a>
          </p>
        </Section>

        {/* Paso 2 */}
        <Section title="2. Instalar dependencias Python">
          <p>PyMuPDF4LLM usa scripts Python para convertir los PDFs. Instal&aacute; los paquetes necesarios:</p>
          <CodeBlock lang="bash">pip install -r requirements.txt</CodeBlock>
          <p>Esto instala:</p>
          <ul className="list-disc pl-5 space-y-1 text-[11px]">
            <li><Code>pymupdf</Code> — Motor de extracción de texto y análisis de PDFs</li>
            <li><Code>pymupdf4llm</Code> — Conversor PDF → Markdown optimizado para LLMs</li>
            <li><Code>rapidocr-onnxruntime</Code> — OCR para PDFs escaneados (opcional)</li>
          </ul>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mt-3">
            <p className="text-[11px] font-semibold text-amber-400 mb-1">⚠ Posible error en Windows</p>
            <p className="text-[11px] text-apple-text-secondary">
              Si el comando <Code>pip</Code> no es reconocido, reemplazalo por{' '}
              <Code>pip3</Code> o ejecutá <Code>python -m pip install -r requirements.txt</Code>.
            </p>
          </div>

          <div className="bg-apple-blue/5 border border-apple-blue/20 rounded-xl p-4 mt-3">
            <p className="text-[11px] font-semibold text-apple-blue mb-1">✅ Verificar instalación</p>
            <p className="text-[11px] text-apple-text-secondary mb-2">Ejecutá este comando para confirmar que los paquetes están instalados:</p>
            <CodeBlock lang="bash">{`python -c "import pymupdf4llm; print(f'PyMuPDF4LLM v{pymupdf4llm.VERSION}')"`}</CodeBlock>
            <p className="text-[11px] text-apple-text-secondary">
              Deberías ver algo como <Code className="text-emerald-400">PyMuPDF4LLM v1.27.0</Code>
            </p>
          </div>
        </Section>

        {/* Paso 3 */}
        <Section title="3. Instalar dependencias Node.js">
          <p>La interfaz web est&aacute; hecha con Next.js. Instal&aacute; las dependencias:</p>
          <CodeBlock lang="bash">npm install</CodeBlock>
          <p>Esto instala los paquetes necesarios para el servidor web y la interfaz de usuario.</p>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mt-3">
            <p className="text-[11px] font-semibold text-amber-400 mb-1">⚠ Error común</p>
            <p className="text-[11px] text-apple-text-secondary">
              Si en Windows aparece un error de políticas de ejecución (<Code>UnauthorizedAccess</Code>),
              us&aacute; <Code>{`cmd /c "npm install"`}</Code> en vez de ejecutar directamente en PowerShell.
            </p>
          </div>
        </Section>

        {/* Paso 4 */}
        <Section title="4. Iniciar la aplicación">
          <p>Una vez instaladas ambas dependencias, inici&aacute; el servidor web:</p>
          <CodeBlock lang="bash">npm run dev</CodeBlock>
          <p>Abrí el navegador en{' '}
            <a href="http://localhost:3000" className="text-apple-blue hover:underline">http://localhost:3000</a>.
          </p>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 mt-3">
            <p className="text-[11px] font-semibold text-emerald-400 mb-1">✅ App funcionando</p>
            <p className="text-[11px] text-apple-text-secondary">
              Vas a ver la interfaz del convertidor: arrastrá un PDF en el panel izquierdo,
              esperá la conversión y obtené el Markdown limpio en el panel derecho.
            </p>
          </div>
        </Section>

        {/* Paso 5 */}
        <Section title="5. Usar desde la terminal (CLI)">
          <p>Tambi&eacute;n pod&eacute;s convertir PDFs directamente desde la terminal sin abrir el navegador:</p>
          <CodeBlock lang="bash">python scripts/pipeline.py documento.pdf --stdout</CodeBlock>
          <p>Comandos útiles:</p>
          <div className="overflow-x-auto my-3">
            <table className="w-full text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-apple-border">
                  <th className="text-left text-apple-text-secondary font-semibold py-2 pr-4">Comando</th>
                  <th className="text-left text-apple-text-secondary font-semibold py-2">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-apple-border/50">
                  <td className="py-2 pr-4"><Code>python scripts/pipeline.py ley.pdf --stdout</Code></td>
                  <td className="py-2 text-apple-text-secondary">Convertir y mostrar en terminal</td>
                </tr>
                <tr className="border-b border-apple-border/50">
                  <td className="py-2 pr-4"><Code>python scripts/pipeline.py ley.pdf ./salida</Code></td>
                  <td className="py-2 text-apple-text-secondary">Guardar en un directorio específico</td>
                </tr>
                <tr className="border-b border-apple-border/50">
                  <td className="py-2 pr-4"><Code>python scripts/analyze_pdf.py ley.pdf</Code></td>
                  <td className="py-2 text-apple-text-secondary">Solo analizar estructura del PDF</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4"><Code>python scripts/convert_law.py ley.pdf -o salida.md --multi-column</Code></td>
                  <td className="py-2 text-apple-text-secondary">Convertir con detección de columnas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Solución de problemas */}
        <Section title="Solución de problemas comunes">
          <div className="space-y-3">
            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <p className="text-[11px] font-bold text-white mb-1">{`"python no es reconocido como un comando interno"`}</p>
              <p className="text-[11px] text-apple-text-secondary">
                Python no está instalado o no está en el PATH. Descargalo desde{' '}
                <a href="https://python.org" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:underline">python.org</a>{' '}
                y durante la instalación marcá la opción <strong>&quot;Add Python to PATH&quot;</strong>.
              </p>
            </div>

            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <p className="text-[11px] font-bold text-white mb-1">{`"ModuleNotFoundError: No module named 'pymupdf'"`}</p>
              <p className="text-[11px] text-apple-text-secondary">
                Las dependencias Python no están instaladas. Ejecutá:{' '}
                <Code>pip install -r requirements.txt</Code>
              </p>
            </div>

            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <p className="text-[11px] font-bold text-white mb-1">El Markdown sale vacío o con muy poco texto</p>
              <p className="text-[11px] text-apple-text-secondary">
                El PDF puede estar escaneado (im&aacute;genes, sin texto digital). Instal&aacute; OCR con{' '}
                <Code>pip install rapidocr-onnxruntime</Code> y usá{' '}
                <Code>ocr=True</Code> en la conversión. También podés verificar con{' '}
                <Code>python scripts/analyze_pdf.py documento.pdf</Code> para ver si el PDF es escaneado.
              </p>
            </div>

            <div className="bg-apple-card border border-apple-border rounded-xl p-4">
              <p className="text-[11px] font-bold text-white mb-1">La app web no carga en http://localhost:3000</p>
              <p className="text-[11px] text-apple-text-secondary">
                Asegurate de que <Code>npm install</Code> se ejecut&oacute; sin errores. Si el puerto 3000 est&aacute; ocupado,
                Next.js lo muestra autom&aacute;ticamente en otro puerto (revis&aacute; la terminal).
              </p>
            </div>
          </div>
        </Section>

        {/* Referencias */}
        <Section title="Referencias">
          <div className="bg-apple-card border border-apple-border rounded-xl p-4">
            <p className="text-[11px] text-apple-text-secondary leading-relaxed">
              Para documentos jurídicos complejos (constituciones, códigos, leyes), consultá la guía
              de estructura legal en{' '}
              <Code>RAG/pdf-ley-a-md/references/legal-structure.md</Code> y la guía de
              solución de problemas en{' '}
              <Code>RAG/pdf-ley-a-md/references/troubleshooting.md</Code>.
            </p>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-apple-border text-center">
          <p className="text-[10px] text-apple-text-tertiary">
            PyMuPDF4LLM — Conversor PDF a Markdown para LLMs y RAG
          </p>
        </div>
      </div>
    </main>
  );
}
