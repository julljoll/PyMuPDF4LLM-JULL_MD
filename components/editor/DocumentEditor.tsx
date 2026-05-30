// components/editor/DocumentEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ThemeColors } from '../pdf/styles/theme';
import { DocumentConfig, SectionLayout } from '../../types/document.types';

interface DocumentEditorProps {
  initialConfig: DocumentConfig;
  colors: ThemeColors;
  onConfigChange: (newConfig: DocumentConfig) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  initialConfig,
  colors,
  onConfigChange,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'json'>('visual');
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [localConfig, setLocalConfig] = useState<DocumentConfig>(initialConfig);

  // Sincronizar jsonText cuando cambie localConfig
  useEffect(() => {
    setJsonText(JSON.stringify(localConfig, null, 2));
  }, [localConfig]);

  // Manejar edición de campos de texto del Cover en el editor visual
  const handleCoverChange = (field: string, value: any) => {
    const updated = {
      ...localConfig,
      cover: {
        ...localConfig.cover,
        [field]: value,
      },
    };
    setLocalConfig(updated);
    onConfigChange(updated);
  };

  // Manejar edición de detalles del Autor en el editor visual
  const handleAuthorChange = (field: string, value: any) => {
    const updated = {
      ...localConfig,
      cover: {
        ...localConfig.cover,
        author: {
          ...localConfig.cover.author,
          [field]: value,
        },
      },
    };
    setLocalConfig(updated);
    onConfigChange(updated);
  };

  // Manejar cambios en las secciones
  const handleSectionTitleChange = (index: number, title: string) => {
    const updatedSections = [...localConfig.sections];
    updatedSections[index] = { ...updatedSections[index], title };
    const updated = { ...localConfig, sections: updatedSections };
    setLocalConfig(updated);
    onConfigChange(updated);
  };

  const handleSectionLayoutChange = (index: number, layout: SectionLayout) => {
    const updatedSections = [...localConfig.sections];
    updatedSections[index] = { ...updatedSections[index], layout };
    const updated = { ...localConfig, sections: updatedSections };
    setLocalConfig(updated);
    onConfigChange(updated);
  };

  // Cambiar el esquema de color del documento
  const handleColorSchemeChange = (scheme: 'default' | 'green' | 'blue' | 'earth' | 'custom') => {
    const updated = {
      ...localConfig,
      colorScheme: scheme,
    };
    setLocalConfig(updated);
    onConfigChange(updated);
  };

  // Aplicar cambios desde el editor JSON Raw
  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);
      setLocalConfig(parsed);
      onConfigChange(parsed);
    } catch (e: any) {
      setJsonError(`JSON Inválido: ${e.message}`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-apple-card border border-apple-border rounded-2xl overflow-hidden shadow-2xl transition-all">
      {/* Cabecera del Panel de Control (Estilo macOS Window Sidebar Header) */}
      <div className="flex items-center justify-between px-6 py-3.5 bg-apple-card border-b border-apple-border">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 bg-rose-500 rounded-full opacity-80" />
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full opacity-80" />
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full opacity-80" />
          <h2 className="text-xs font-bold text-apple-text-secondary uppercase tracking-wider pl-2">
            Editor de Configuración
          </h2>
        </div>
        
        {/* Control Segmentado Estilo iOS/macOS HIG */}
        <div className="flex bg-apple-input p-0.5 rounded-lg border border-apple-border">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeTab === 'visual'
                ? 'bg-apple-border-light text-white shadow-sm border border-white/5'
                : 'text-apple-text-secondary hover:text-apple-text'
            }`}
          >
            Visual
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeTab === 'json'
                ? 'bg-apple-border-light text-white shadow-sm border border-white/5'
                : 'text-apple-text-secondary hover:text-apple-text'
            }`}
          >
            JSON Raw
          </button>
        </div>
      </div>

      {/* Cuerpo del Editor */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-apple-text">
        {activeTab === 'visual' ? (
          <div className="space-y-6">
            {/* 1. Ajustes del Documento */}
            <div className="bg-apple-input/10 border border-apple-border rounded-xl p-5 space-y-4 shadow-inner">
              <h3 className="text-[11px] font-bold text-apple-blue uppercase tracking-wider">
                Ajustes Generales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={localConfig.title}
                    onChange={(e) => {
                      const updated = { ...localConfig, title: e.target.value };
                      setLocalConfig(updated);
                      onConfigChange(updated);
                    }}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text placeholder-apple-text-tertiary focus:border-apple-blue focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Esquema de Color (HIG Theme)
                  </label>
                  <select
                    value={localConfig.colorScheme || 'default'}
                    onChange={(e) => handleColorSchemeChange(e.target.value as any)}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                  >
                    <option value="default">Default HIG (System Blue)</option>
                    <option value="green">La Cigarronera (Green & Gold)</option>
                    <option value="blue">Classic Blue</option>
                    <option value="earth">Warm Earth</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Configuración de Portada */}
            <div className="bg-apple-input/10 border border-apple-border rounded-xl p-5 space-y-4 shadow-inner">
              <h3 className="text-[11px] font-bold text-apple-blue uppercase tracking-wider">
                Portada del PDF (Cover Settings)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Título Portada
                  </label>
                  <input
                    type="text"
                    value={localConfig.cover.title}
                    onChange={(e) => handleCoverChange('title', e.target.value)}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Subtítulo Portada
                  </label>
                  <input
                    type="text"
                    value={localConfig.cover.subtitle || ''}
                    onChange={(e) => handleCoverChange('subtitle', e.target.value)}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                  Descripción
                </label>
                <textarea
                  value={localConfig.cover.description || ''}
                  onChange={(e) => handleCoverChange('description', e.target.value)}
                  rows={2}
                  className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none resize-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={localConfig.cover.author.name}
                    onChange={(e) => handleAuthorChange('name', e.target.value)}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-apple-text-secondary mb-1.5 font-bold uppercase tracking-wide">
                    Coordenadas / Badge
                  </label>
                  <input
                    type="text"
                    value={localConfig.cover.badgeText || ''}
                    onChange={(e) => handleCoverChange('badgeText', e.target.value)}
                    className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 3. Secciones */}
            <div className="bg-apple-input/10 border border-apple-border rounded-xl p-5 space-y-4 shadow-inner">
              <h3 className="text-[11px] font-bold text-apple-blue uppercase tracking-wider">
                Secciones del Documento ({localConfig.sections.length})
              </h3>
              <div className="space-y-3.5">
                {localConfig.sections.map((section, idx) => (
                  <div key={section.id} className="border border-apple-border rounded-xl p-4 bg-apple-input/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-apple-blue font-bold uppercase tracking-wider">
                        Sección {section.sectionNumber || idx + 1}
                      </span>
                      <select
                        value={section.layout}
                        onChange={(e) => handleSectionLayoutChange(idx, e.target.value as SectionLayout)}
                        className="bg-apple-input border border-apple-border text-[11px] text-apple-text rounded-lg px-2.5 py-1 focus:border-apple-blue focus:outline-none transition-all"
                      >
                        <option value="TEXT_FULL">TEXT_FULL</option>
                        <option value="TEXT_IMAGE_RIGHT">TEXT_IMAGE_RIGHT</option>
                        <option value="IMAGE_TEXT_LEFT">IMAGE_TEXT_LEFT</option>
                        <option value="IMAGE_FULL_WIDTH">IMAGE_FULL_WIDTH</option>
                        <option value="TWO_COLUMN_EQUAL">TWO_COLUMN_EQUAL</option>
                        <option value="METRIC_BANNER">METRIC_BANNER</option>
                        <option value="CALLOUT_BLOCK">CALLOUT_BLOCK</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => handleSectionTitleChange(idx, e.target.value)}
                      className="w-full bg-apple-input border border-apple-border rounded-lg px-3 py-1.5 text-xs text-apple-text focus:border-apple-blue focus:outline-none transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col h-full">
            <div className="flex-1">
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="w-full h-[520px] bg-apple-bg border border-apple-border rounded-xl p-4 font-mono text-xs text-apple-blue focus:border-apple-blue focus:outline-none"
              />
            </div>
            {jsonError && (
              <div className="p-3 bg-rose-950/30 border border-rose-900/50 rounded-xl text-rose-400 text-xs">
                {jsonError}
              </div>
            )}
            <button
              onClick={handleApplyJson}
              className="w-full bg-apple-blue hover:bg-apple-blue-hover text-white font-semibold text-xs rounded-xl py-2.5 transition-all active:scale-[0.98]"
            >
              Aplicar Cambios del JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default DocumentEditor;
