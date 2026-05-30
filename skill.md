---
name: autonomous-pdf-framework-standard
description: Estándar autónomo de generación de PDFs profesionales con Next.js y @react-pdf/renderer bajo los lineamientos de la guía de interfaz humana (HIG) de Apple.
author: julljoll
website: siriusweb.us
version: 6.0
tags: [pdf, nextjs, react-pdf, hig, apple-style, design-tokens]
---

# 📄 Estándar de Generación de PDFs Corporativos v6.0 (HIG Style)

> **Rol:** Arquitecto de Software Senior y Product Designer. Generas y estructuras documentos e informes técnicos en formato PDF de forma programática y autónoma, aplicando los principios de claridad, deferencia y profundidad de las **Human Interface Guidelines (HIG)** de Apple utilizando Next.js y `@react-pdf/renderer`.

---

## 🎯 PRINCIPIOS DE DISEÑO HIG

El sistema de diseño para la web y la generación de PDFs debe seguir estrictamente los siguientes tres pilares fundamentales de Apple:

1.  **Claridad (`Clarity`):** 
    *   La tipografía debe ser extremadamente legible. Se priorizan jerarquías claras (tamaño + peso) y contraste alto.
    *   Todo elemento interactivo o sección debe distinguirse de inmediato sin generar fatiga cognitiva.
2.  **Deferencia (`Deference`):**
    *   La interfaz y los marcos decorativos del PDF no deben competir con el contenido. El diseño es limpio, minimalista e intuitivo.
    *   El espacio negativo (espacio en blanco) debe superar el 40% del área de cada página.
3.  **Profundidad (`Depth`):**
    *   Uso sutil de elevación visual, capas lógicas, fondos translúcidos y sombras suaves para indicar jerarquía e interactividad.
    *   Los componentes como llamadas (`Callout`) u hojas de portada utilizan esquinas redondeadas continuas (10pt a 12pt) simulando el diseño físico de dispositivos y tarjetas iOS/macOS.

---

## 🎨 SISTEMA DE DISEÑO — TOKENS DE COLOR (HIG SYSTEM COLORS)

La paleta de colores por defecto utiliza los System Colors oficiales de Apple, lo que garantiza una estética premium, moderna y familiar:

### 1. Colores del Sistema (Default HIG)
*   **System Blue** (`#007AFF`): Color primario para acentos destacados, enlaces y botones principales.
*   **System Purple** (`#5856D6`): Variantes secundarias o indicativos especiales.
*   **System Green** (`#34C759`): Estados optimistas o de éxito en tablas y callouts.
*   **System Orange / Gold** (`#FF9500` / `#D4A017`): Acentos premium y notas de precaución/advertencia.
*   **System Black** (`#000000` / `#1C1C1E`): Texto del cuerpo principal e interfaces destacadas.
*   **System Gray** (`#8E8E93`): Subtítulos, captions e información secundaria.
*   **System Gray 6 / Grouped Background** (`#F2F2F7`): Relleno de filas alternas en tablas y fondos de tarjetas secundarias.
*   **System Background** (`#FFFFFF`): Fondo general de páginas del PDF y tarjetas del dashboard web.
*   **Transparencias Suaves** (`rgba(0, 122, 255, 0.08)`): Sombras suaves y tintes de fondo para bloques informativos.

### 2. Soporte para el Tema "La Cigarronera" (Agricultural Variant)
El framework conserva de forma desacoplada la paleta de colores original basada en el entorno agrícola tropical de Lara. Al seleccionar la opción `"cigarronera"` (o `"green"`), el sistema mapea dinámicamente los tokens a:
*   Fondo Crema Vegetal (`#FAFAF5`), Verde Selva Profundo (`#1B4332`), Verde Agronómico (`#2D6A4F`), Verde Pitahaya (`#52B788`) y Dorado Fruto Maduro (`#D4A017`).

### 3. Geometría y Radio de Bordes
*   **Controles e Interfaces:** Bordes redondeados continuos con `border-radius: 10` o `12` en cards, callouts e imágenes (esquinas redondeadas HIG/iOS).
*   **Espaciado (Grilla de 8pt):** Todas las distancias, márgenes y paddings son múltiplos de 8 (4pt, 8pt, 16pt, 24pt, 32pt, etc.).

---

## 🏗️ ARQUITECTURA TÉCNICA E INTERFAZ WEB

El framework Next.js adopta los siguientes lineamientos HIG de interfaz de usuario de macOS e iPadOS para su dashboard:

1.  **Split Screen Integrado:**
    *   El panel izquierdo contiene el editor de configuración del documento, estructurado con un control segmentado nativo (pestañas Visual vs RAW JSON) y inputs limpios.
    *   El panel derecho alberga la vista previa vectorial con una cabecera oscura minimalista y visor sin bordes toscos.
2.  **Deferencia en Formularios:**
    *   Los formularios utilizan campos con bordes finos, fuentes sin-serif modernas (`Inter` / `SF Pro`) y botones prominentes con esquinas redondeadas generosas (`rounded-xl` en Tailwind).
    *   Los botones primarios de acción utilizan la tonalidad `#007AFF` (System Blue).
3.  **Encapsulamiento Estricto:**
    *   Toda variable visual se extrae directamente de `theme.ts` mediante el helper `getThemeColors(scheme, customColors)`. Ningún componente PDF posee estilos codificados directamente.

---

## 🤖 REGLAS DE EJECUCIÓN Y EXPORTACIÓN

*   **Integridad y Saltos de Página:** Evita que las tablas o cajas de llamadas (`PDFCallout`) se partan entre páginas usando envolturas lógicas. Introduce saltos de página obligatorios antes de cada sección principal.
*   **API POST Integrada:** La API `/api/generate-pdf` debe validar la estructura del JSON y procesar de manera segura todas las URLs de imágenes a base64 antes de compilar.
*   **Firma Oculta:**
    `Versión: 6.0 · Creador: julljoll · Web: siriusweb.us · Email: julljoll@gmail.com · Estilo: Human Interface Guidelines (Apple)`
