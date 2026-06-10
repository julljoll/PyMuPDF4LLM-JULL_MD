'use client';

import React, { useCallback, useRef, useState } from 'react';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelect(file);
    }
  }, [disabled, onFileSelect]);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`
        relative flex flex-col items-center justify-center w-full h-full
        border-2 border-dashed rounded-2xl cursor-pointer
        transition-all duration-200
        ${isDragging
          ? 'border-apple-blue bg-apple-blue/5 scale-[1.02]'
          : 'border-apple-border-light hover:border-apple-blue/50 bg-apple-input/5'
        }
        ${disabled ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-col items-center space-y-4 p-8">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
          isDragging ? 'bg-apple-blue/20 scale-110' : 'bg-apple-input'
        }`}>
          <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-apple-text">
            {isDragging ? 'Suelta tu PDF aquí' : 'Arrastra tu PDF aquí'}
          </p>
          <p className="text-[11px] text-apple-text-secondary">
            o haz clic para seleccionar un archivo
          </p>
        </div>

        <div className="flex items-center space-x-4 text-[10px] text-apple-text-tertiary">
          <span>PDF hasta 50 MB</span>
          <span className="w-1 h-1 rounded-full bg-apple-border-light" />
          <span>PyMuPDF4LLM</span>
        </div>
      </div>
    </div>
  );
};

export default PdfUploader;
