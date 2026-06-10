'use client';

import React, { useState, useCallback } from 'react';
import { PdfUploader } from '../components/ui/PdfUploader';
import { MarkdownPreview } from '../components/ui/MarkdownPreview';

type Status = 'idle' | 'uploading' | 'converting' | 'done' | 'error';

export default function ConverterPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [markdown, setMarkdown] = useState('');
  const [filename, setFilename] = useState('');
  const [error, setError] = useState('');
  const handleFileSelect = useCallback(async (file: File) => {
    setStatus('uploading');
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    setStatus('converting');

    try {
      const res = await fetch('/api/convert-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al convertir el PDF');
      }

      setMarkdown(data.markdown);
      setFilename(data.filename || file.name.replace(/\.pdf$/i, '.md'));
      setStatus('done');
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Error de conexión al convertir el PDF.');
      setStatus('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setStatus('idle');
    setMarkdown('');
    setFilename('');
    setError('');
  }, []);

  return (
    <main className="min-h-screen bg-apple-bg text-apple-text flex flex-col antialiased">
      <header className="apple-header px-8 py-3.5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-apple-blue flex items-center justify-center font-bold text-white shadow-lg shadow-apple-blue/20">
            P
          </div>
          <div>
            <h1 className="text-sm font-bold text-apple-text tracking-tight leading-none">
              PyMuPDF4LLM
            </h1>
            <p className="text-[9px] text-apple-text-secondary font-semibold tracking-wide uppercase mt-1">
              PDF a Markdown para LLMs
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/julljoll/PyMuPDF4LLM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-apple-text-secondary hover:text-apple-blue transition-all"
          >
            GitHub
          </a>
          {status === 'done' && (
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Convertido
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Panel izquierdo: Uploader / Estado */}
        <div className="h-[calc(100vh-120px)] min-h-[500px]">
          {status === 'idle' || status === 'uploading' ? (
            <PdfUploader onFileSelect={handleFileSelect} disabled={status === 'uploading'} />
          ) : status === 'converting' ? (
            <div className="flex flex-col items-center justify-center h-full bg-apple-card border border-apple-border rounded-2xl">
              <div className="flex flex-col items-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-apple-blue/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-apple-blue animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-apple-text">Convirtiendo PDF...</p>
                  <p className="text-[11px] text-apple-text-secondary">
                    Analizando, extrayendo texto y limpiando formato
                  </p>
                </div>
                <div className="w-48 h-1 bg-apple-input rounded-full overflow-hidden">
                  <div className="h-full bg-apple-blue rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center justify-center h-full bg-apple-card border border-apple-border rounded-2xl p-8">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-rose-400 mb-1">Error en la conversión</p>
              <p className="text-[11px] text-apple-text-secondary text-center mb-5 max-w-sm">{error}</p>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 text-xs font-semibold bg-apple-blue hover:bg-apple-blue-hover text-white rounded-xl transition-all"
              >
                Intentar de nuevo
              </button>
            </div>
          ) : null}
        </div>

        {/* Panel derecho: Resultado / placeholder */}
        <div className="h-[calc(100vh-120px)] min-h-[500px]">
          {status === 'done' ? (
            <MarkdownPreview markdown={markdown} filename={filename} onReset={handleReset} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-apple-card border border-apple-border rounded-2xl">
              <div className="flex flex-col items-center space-y-4 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-apple-input flex items-center justify-center">
                  <svg className="w-8 h-8 text-apple-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-apple-text-secondary">
                  Resultado Markdown
                </p>
                <p className="text-[11px] text-apple-text-tertiary max-w-xs">
                  Arrastra un PDF a la izquierda para convertirlo a Markdown limpio y estructurado, listo para LLMs y RAG.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
