// app/page.tsx
'use client';

import React, { useState } from 'react';
import sampleDocument from '../data/sample-document.json';
import { DocumentConfig } from '../types/document.types';
import { theme } from '../components/pdf/styles/theme';
import { DocumentEditor } from '../components/editor/DocumentEditor';
import { PreviewPanel } from '../components/ui/PreviewPanel';

export default function Dashboard() {
  const [config, setConfig] = useState<DocumentConfig>(sampleDocument as any);
  const [isDownloading, setIsDownloading] = useState(false);

  // Gatillo de descarga del PDF desde la API
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Fallo al generar el PDF.');
      }

      // Convertir la respuesta binaria a un blob y descargar
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `informe_${config.id || 'documento'}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar PDF:', error);
      alert('Error generando el PDF. Por favor verifica el formato del JSON.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* Barra de Navegación Estilo macOS HIG (Translúcida y minimalista) */}
      <header className="bg-slate-900/60 backdrop-blur-md border-b border-slate-900/80 px-8 py-3.5 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Logo estilo App Icon redondeado HIG */}
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
            P
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 tracking-tight leading-none">
              Creador PDF
            </h1>
            <p className="text-[9px] text-slate-400 font-semibold tracking-wide uppercase mt-1">
              Human Interface Guidelines Standard
            </p>
          </div>
        </div>

        {/* Botón de exportación estilo System Blue de Apple */}
        <div className="flex items-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg shadow transition-all ${
              isDownloading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-[0.98]'
            }`}
          >
            {isDownloading ? (
              <span className="flex items-center space-x-1.5">
                <svg className="animate-spin h-3 w-3 text-slate-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Exportando...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Exportar PDF</span>
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Grid Principal (Editor + Preview) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
        {/* Editor izquierdo */}
        <div className="h-[calc(100vh-120px)] min-h-[500px]">
          <DocumentEditor 
            initialConfig={config} 
            colors={theme.colors as any} 
            onConfigChange={setConfig} 
          />
        </div>

        {/* Visor derecho */}
        <div className="h-[calc(100vh-120px)] min-h-[500px]">
          <PreviewPanel config={config} colors={theme.colors as any} />
        </div>
      </div>
    </main>
  );
}
