'use client';

import React, { useState } from 'react';

interface MarkdownPreviewProps {
  markdown: string;
  filename: string;
  onReset: () => void;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown, filename, onReset }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const lines = markdown.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMarkdown = (text: string) => {
    const html = text
      .replace(/^### (.+)$/gm, '<h3 class="text-sm font-bold text-apple-blue mt-4 mb-1">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold text-white mt-5 mb-1.5">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-lg font-bold text-white mt-5 mb-2">$1</h1>')
      .replace(/^- (.+)$/gm, '<li class="text-xs text-apple-text ml-4 list-disc">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="text-xs text-apple-text ml-4 list-decimal">$1</li>')
      .replace(/---/g, '<hr class="my-3 border-apple-border-light" />')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-apple-text">$1</em>')
      .replace(/^---\s*$/gm, '<hr class="my-3 border-apple-border-light" />')
      .split('\n\n').map(block => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<hr')) return trimmed;
        if (trimmed.startsWith('|')) {
          const rows = trimmed.split('\n').map(r => r.trim()).filter(Boolean);
          const tableRows = rows.map((row, i) => {
            const cells = row.split('|').filter((_, j, arr) => j > 0 && j < arr.length - 1);
            if (i === 1 && cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
            const tag = i === 0 ? 'th' : 'td';
            return `<tr>${cells.map(c => `<${tag} class="text-xs text-apple-text border border-apple-border-light px-2 py-1">${c.trim()}</${tag}>`).join('')}</tr>`;
          }).filter(Boolean).join('\n');
          return `<table class="w-full border-collapse my-2">${tableRows}</table>`;
        }
        return `<p class="text-xs text-apple-text leading-relaxed my-1">${trimmed}</p>`;
      }).join('\n');
    return html;
  };

  return (
    <div className="flex flex-col h-full bg-apple-card border border-apple-border rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3 bg-apple-card border-b border-apple-border">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          <h2 className="text-xs font-bold text-apple-text-secondary uppercase tracking-wider">
            Markdown
          </h2>
          <span className="text-[10px] text-apple-text-tertiary ml-1">
            {lines.length} líneas · {markdown.length.toLocaleString()} caracteres
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-apple-input p-0.5 rounded-lg border border-apple-border">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                activeTab === 'preview' ? 'bg-apple-border-light text-white' : 'text-apple-text-secondary hover:text-apple-text'
              }`}
            >
              Vista
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all ${
                activeTab === 'raw' ? 'bg-apple-border-light text-white' : 'text-apple-text-secondary hover:text-apple-text'
              }`}
            >
              Raw
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-2.5 py-1.5 text-[10px] font-semibold bg-apple-input border border-apple-border rounded-lg text-apple-text-secondary hover:text-white transition-all"
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>

          <button
            onClick={handleDownload}
            className="px-2.5 py-1.5 text-[10px] font-semibold bg-apple-blue hover:bg-apple-blue-hover text-white rounded-lg transition-all"
          >
            Descargar .md
          </button>

          <button
            onClick={onReset}
            className="px-2.5 py-1.5 text-[10px] font-semibold bg-apple-input border border-apple-border rounded-lg text-apple-text-secondary hover:text-white transition-all"
          >
            Nuevo
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'preview' ? (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        ) : (
          <pre className="text-xs text-apple-text font-mono whitespace-pre-wrap break-words">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview;
