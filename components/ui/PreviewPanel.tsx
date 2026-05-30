// components/ui/PreviewPanel.tsx
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ThemeColors } from '../pdf/styles/theme';
import { DocumentConfig } from '../../types/document.types';

// Importación dinámica del visor completo (Viewer + Document) para evitar errores de SSR y reconciliación
const PDFViewerComponent = dynamic(
  () => import('../pdf/PDFViewerComponent'),
  { ssr: false, loading: () => <p className="text-slate-400 font-medium text-xs">Cargando visor de PDF...</p> }
);

interface PreviewPanelProps {
  config: DocumentConfig;
  colors: ThemeColors;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ config, colors }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full bg-apple-card border border-apple-border rounded-2xl">
        <p className="text-apple-text-secondary text-xs">Iniciando previsualización...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-apple-card border border-apple-border rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Barra de cabecera de Preview (Estilo macOS Title Bar) */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-apple-card border-b border-apple-border">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse" />
          <h2 className="text-xs font-bold text-apple-text-secondary uppercase tracking-wider pl-1">
            Previsualización del PDF
          </h2>
        </div>
        <span className="text-[10px] font-semibold text-apple-blue bg-apple-blue/10 px-3 py-1 rounded-full border border-apple-blue/20">
          Papel: Oficio / Legal
        </span>
      </div>

      {/* Visor del PDF */}
      <div className="flex-1 bg-apple-bg relative">
        <PDFViewerComponent config={config} />
      </div>
    </div>
  );
};
export default PreviewPanel;
