'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MacWindow } from "@/components/ui/MacWindow";
import { DropZone } from "@/components/ui/DropZone";
import { MarkdownPreview } from "@/components/ui/MarkdownPreview";
import { FileText, Sparkles, AlertCircle } from "lucide-react";

export default function Home() {
  const [markdown, setMarkdown] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ chars: number; words: number } | null>(null);
  const [currentFile, setCurrentFile] = useState<string | undefined>();

  const handleFile = async (file: File) => {
    setIsConverting(true);
    setError(null);
    setMarkdown("");
    setStats(null);
    setCurrentFile(file.name);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/convert", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error desconocido");
        return;
      }

      setMarkdown(data.markdown);
      setStats({ chars: data.chars, words: data.words });
    } catch {
      setError("Error de red. Verifica tu conexión.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/30 to-slate-100
                    dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900
                    flex items-center justify-center p-6">
      <MacWindow
        title="PyMuPDF4LLM — Conversor PDF a Markdown"
        className="w-full max-w-6xl min-h-[700px]"
      >
        <div className="flex flex-1 overflow-hidden">

          {/* ─── Panel izquierdo: Upload ──────────────────────── */}
          <div className="w-80 flex-shrink-0 flex flex-col gap-4 p-5 border-r border-macos-border/50 glass-sidebar">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[var(--radius-macos)] bg-macos-primary flex items-center justify-center shadow-macos-sm">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-tight text-macos-card-fg">PDF a Markdown</h1>
                <p className="text-xs text-macos-muted-fg">Powered by markitdown-ts</p>
              </div>
            </div>

            <hr className="border-macos-border/50" />

            <DropZone onFile={handleFile} isConverting={isConverting} />

            <AnimatePresence>
              {isConverting && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-sm text-macos-muted-fg overflow-hidden"
                >
                  <Sparkles className="w-4 h-4 text-macos-blue animate-pulse shrink-0" />
                  Procesando documento…
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 rounded-[var(--radius-macos)] bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                >
                  <AlertCircle className="w-4 h-4 text-macos-red mt-0.5 shrink-0" />
                  <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {stats && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-1.5"
              >
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-macos-muted text-macos-muted-fg">
                  {stats.chars.toLocaleString()} caracteres
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-macos-muted text-macos-muted-fg">
                  {stats.words.toLocaleString()} palabras
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-macos-green/10 text-macos-green">
                  Convertido ✓
                </span>
              </motion.div>
            )}

            <hr className="border-macos-border/50" />

            <div className="text-xs text-macos-muted-fg space-y-1">
              <p className="font-medium text-macos-card-fg">Soportado</p>
              <p>&bull; Leyes y decretos</p>
              <p>&bull; Reglamentos</p>
              <p>&bull; Códigos jurídicos</p>
              <p>&bull; Documentos técnicos</p>
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
                  className="h-full flex flex-col items-center justify-center gap-3 text-macos-muted-fg"
                >
                  <div className="w-16 h-16 rounded-[var(--radius-macos-lg)] bg-macos-muted flex items-center justify-center">
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
  );
}
