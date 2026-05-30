// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { PDFDocument } from '../../../components/pdf/PDFDocument';
import { DocumentConfig } from '../../../types/document.types';

// Helper para convertir URLs de imágenes externas a Base64 en el servidor
// react-pdf tiene problemas cargando URLs HTTPS directamente desde ciertos servidores en node
async function convertImageToBase64(url: string): Promise<string> {
  if (!url || url.startsWith('data:') || url.startsWith('placeholder:')) {
    return url;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al descargar la imagen');
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return `data:${contentType};base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Fallo al convertir imagen ${url} a Base64:`, error);
    // Devolvemos una cadena especial para que el componente muestre el placeholder
    return 'placeholder:failed-to-load';
  }
}

export async function POST(req: NextRequest) {
  try {
    const config: DocumentConfig = await req.json();

    // 1. Validar la estructura básica de la configuración
    if (!config || !config.title || !config.cover || !config.sections) {
      return NextResponse.json(
        { error: 'Configuración de documento inválida o incompleta.' },
        { status: 400 }
      );
    }

    // 2. Descargar y pre-convertir imágenes de portada y secciones a Base64
    if (config.cover.backgroundImage) {
      config.cover.backgroundImage = await convertImageToBase64(config.cover.backgroundImage);
    }
    if (config.cover.logoSrc) {
      config.cover.logoSrc = await convertImageToBase64(config.cover.logoSrc);
    }

    for (const section of config.sections) {
      if (section.sideImage?.src) {
        section.sideImage.src = await convertImageToBase64(section.sideImage.src);
      }
      for (const block of section.mainContent) {
        if (block.type === 'image' && block.data.src) {
          block.data.src = await convertImageToBase64(block.data.src);
        }
      }
      if (section.sideContent) {
        for (const block of section.sideContent) {
          if (block.type === 'image' && block.data.src) {
            block.data.src = await convertImageToBase64(block.data.src);
          }
        }
      }
    }

    // 3. Renderizar el PDF a Buffer
    const pdfStream = React.createElement(PDFDocument, { config });
    const buffer = await renderToBuffer(pdfStream as any);

    // 4. Retornar el PDF binario con las cabeceras de descarga adecuadas
    const headers = new Headers();
    headers.append('Content-Type', 'application/pdf');
    headers.append('Content-Disposition', `attachment; filename="informe_${config.id || 'documento'}.pdf"`);
    headers.append('Content-Length', buffer.length.toString());

    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error('Error generando PDF en API Route:', error);
    return NextResponse.json(
      { error: 'Fallo al procesar y compilar el documento PDF.', details: error.message },
      { status: 500 }
    );
  }
}
