'use client';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { Copy, Download, Check } from "lucide-react";
import { useState } from "react";

interface MarkdownPreviewProps {
  content: string;
  filename?: string;
}

export function MarkdownPreview({ content, filename }: MarkdownPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename?.replace(/\.pdf$/i, ".md") ?? "documento.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-macos-border/50 glass-sidebar">
        <span className="text-xs font-medium text-macos-muted-fg uppercase tracking-wider">
          Vista previa Markdown
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-md hover:bg-macos-muted text-macos-card-fg transition-all"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-macos-green" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? "Copiado" : "Copiar"}</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 text-xs font-medium rounded-md hover:bg-macos-muted text-macos-card-fg transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar .md</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-6 prose"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </motion.div>
      </div>
    </div>
  );
}
