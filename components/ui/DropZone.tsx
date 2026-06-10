'use client';

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFile: (file: File) => void;
  isConverting: boolean;
}

export function DropZone({ onFile, isConverting }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === "application/pdf") {
      setFileName(file.name);
      onFile(file);
    }
  }, [onFile]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFile(file);
    }
  }, [onFile]);

  return (
    <label
      className={cn(
        "relative flex flex-col items-center justify-center",
        "w-full min-h-[200px] cursor-pointer",
        "border-2 border-dashed transition-all duration-200 rounded-[var(--radius-macos)]",
        isDragging
          ? "border-macos-blue bg-macos-accent scale-[1.01]"
          : "border-macos-border hover:border-macos-blue/50 hover:bg-macos-muted/50",
        isConverting && "pointer-events-none opacity-60"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf,application/pdf"
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
            className="flex flex-col items-center gap-3 p-6"
          >
            <div className="w-14 h-14 rounded-[var(--radius-macos)] bg-macos-accent flex items-center justify-center">
              <FileText className="w-7 h-7 text-macos-blue" />
            </div>
            <span className="text-sm font-medium text-macos-card-fg truncate max-w-[200px]">
              {fileName}
            </span>
            <span className="text-xs text-macos-muted-fg">
              {isConverting ? "Convirtiendo…" : "Haz clic para cambiar archivo"}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 p-6"
          >
            <div className="w-14 h-14 rounded-[var(--radius-macos)] bg-macos-muted flex items-center justify-center">
              <Upload className="w-7 h-7 text-macos-muted-fg" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-macos-card-fg">Arrastra tu PDF aquí</p>
              <p className="text-xs text-macos-muted-fg mt-1">
                o haz clic para seleccionar &bull; Solo PDF
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
}
