// components/pdf/PDFViewerComponent.tsx
'use client';

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDocument } from './PDFDocument';
import { DocumentConfig } from '../../types/document.types';

interface PDFViewerComponentProps {
  config: DocumentConfig;
}

export const PDFViewerComponent: React.FC<PDFViewerComponentProps> = ({ config }) => {
  return (
    <PDFViewer className="w-full h-full border-none" showToolbar={true}>
      <PDFDocument config={config} />
    </PDFViewer>
  );
};

export default PDFViewerComponent;
