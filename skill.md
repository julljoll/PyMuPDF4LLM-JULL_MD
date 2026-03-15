# 📄 Instrucciones: Generador de One-Pages (Estilo PDF Interactivo)

Este documento contiene las directrices precisas que **Google Antigravity** debe seguir al momento de generar documentos web de una sola página ("one-pages"). El objetivo es replicar la estética y formato de un documento impreso o PDF (ej. A4 o Carta), acompañado de un índice lateral interactivo y minimalista.

---

## 🎯 1. Objetivo Principal
Generar un archivo estructurado que funcione como un documento de lectura continuo, brindando una experiencia de usuario (UX) premium, alta legibilidad y un diseño impecable.

---

## 📏 2. Dimensiones y Layout (Estética de "Hoja de Papel")

El diseño debe transmitir la sensación de estar leyendo una hoja de papel digital colocada sobre un escritorio o fondo limpio.

### Contenedor Principal del Documento (`main` o `article`)
- **Ancho máximo del contenido:** `max-w-3xl` o `max-w-4xl` (aproximadamente 800px para proporciones de lectura de A4/Carta).
- **Alineación:** Centrado horizontalmente (`mx-auto`).
- **Fondo de la hoja:** Blanco puro (`bg-white`).
- **Sombra:** Sutil y elegante para dar profundidad. 
  - *Sugerencia estilo Tailwind:* `shadow-lg shadow-gray-200/50`.
- **Márgenes Internos (Padding):** Generosos, emulando los márgenes de impresión (ej. `px-8 py-12` o `px-12 py-16`).

### Fondo General (`body`)
- **Color:** Un fondo neutro que contraste ligeramente con la hoja blanca (ej. `bg-gray-50` o `bg-slate-50`).

---

## 🏗️ 3. Arquitectura CSS (Estilo Tailwind y Atomic Design)

Antigravity debe estructurar el CSS utilizando un enfoque **Atomic Design** e imitando las clases utilitarias de **Tailwind CSS**.

1. **Atomic Design:** Organizar los componentes visuales desde sus partes más pequeñas (Átomos: botones, textos, íconos), pasando por agrupaciones (Moléculas: tarjetas de contenido, menús), Organismos (el Hero, el Footer, el Índice lateral), hasta el Template final (el Layout).
2. **Clases Utilitarias (Tailwind-like):** En lugar de crear clases semánticas pesadas (ej. `.card-primary-title`), utilizar clases atómicas de utilidad en el CSS embebido (ej. `.text-gray-900`, `.font-bold`, `.text-2xl`, `.mb-4`, `.flex`, `.items-center`).
3. **Variables CSS:** Usar variables en el `:root` para unificar la paleta de colores y el espaciado, y consumirlas en las clases utilitarias (ej. `--spacing-4: 1rem;`).

---

## 🖼️ 4. Recursos Visuales (Íconos e Imágenes)

1. **Google Material Design Icons:** Usa **obligatoriamente** los íconos limpios y modernos de Google Fonts.
   - *Implementación:* Incluir `<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">`.
   - *Uso:* `<span class="material-icons-outlined text-gray-500">article</span>`.
2. **Imágenes de Unsplash:** Todas las imágenes fotográficas deben provenir de Unsplash usando su API de origen para que sean aleatorias y libres de derechos, pero ajustadas a una temática específica.
   - *Formato de URL:* `https://source.unsplash.com/random/800x400/?aerodynamics,paper` (ejemplo para un tema de aviones de papel). Asegurar relaciones de aspecto consistentes (ej. `aspect-video`).

---

## 📑 5. Menú Superior Minimalista (Top Bar / Índice Interactivo)

El documento debe incluir una barra de navegación en la parte superior que actúe como índice de contenidos.

### Detalles Visuales
- **Estilo:** Minimalismo extremo. Ubicado en la parte superior actuando como una barra de navegación horizontal (Topbar). Sin colores de fondo pesados, idealmente blanco semi-transparente o esmerilado con leve sombra.
- **Tipografía y Diseño:** Incluye siempre íconos de Material Design junto a cada enlace del menú. Color gris atenuado (`text-gray-500` o similar) alineados horizontalmente (Flexbox).
- **Estado Activo/Hover:** 
  - Transición suave a un texto más oscuro (`#111827`) o al color primario del tema.
  - *Indicador visual sutil:* Una línea horizontal inferior bajo el elemento activo (ej. `border-b-2 border-blue-500`).
- **Posicionamiento:** Debe mantenerse fijo en la parte superior de la pantalla acompañando la lectura (`position: sticky; top: 0; z-index: 50`).

### Funcionalidad (UX)
- **Desplazamiento Suave (Smooth Scroll):** Obligatorio el uso de CSS `html { scroll-behavior: smooth; }` para que los anclajes no den saltos bruscos.
- **Scroll Spy (Seguimiento temporal):** Obligatorio incluir un script muy ligero (ej. `IntersectionObserver` de JavaScript) para resaltar automáticamente qué sección del índice el usuario está leyendo actualmente en pantalla.

---

## 🧠 5. Principios UX/UI Profesionales (Gestalt, Norman & IBM Design)

Para elevar la experiencia de lectura a un estándar de nivel "Enterprise" y profesional, **TODOS los manuales estructurados bajo este script deben cumplir los siguientes postulados cognitivos**:

1. **Explicación Dual (Texto + Imagen):** Ningún paso complejo debe ser sólo texto. Cada sección crítica de un manual o tutorial debe ir acompañada de una imagen ilustrativa o fotográfica contextual obtenida de **Unsplash** (usando keywords específicos). *La mente asimila mejor la información cuando es dual.*
2. **Leyes de Gestalt Aplicadas:**
   - **Proximidad:** Agrupar visualmente elementos relacionados. Si una imagen explica un párrafo, ambos deben estar con un margen reducido entre sí (`gap-2` o `mb-2`), y un margen exterior más grande que los separe de la siguiente sección (`mb-12`).
   - **Similitud y Consistencia:** Mantener los mismos estilos para elementos con la misma función (ej. todas las llamadas a la acción o *Tips* deben tener el mismo color y jerarquía visual).
3. **Diseño de Don Norman (Diseño Emocional y Minimalista):**
   - **Visibilidad y *Affordance*:** Los elementos interactivos (como el Menú Superior) deben sugerir claramente que son clicables (cambio de color al *hover*, cursor *pointer*, línea inferior indicadora).
   - **Carga Cognitiva Reducida:** Menos es más. Limpiar el diseño de ruidos visuales. Cada línea de texto, sombra, o color debe tener un propósito claro; si no aporta funcionalidad o estética directa, elimínalo (Minimalismo Funcional).
4. **IBM Design Thinking (Enfoque en el Usuario):**
   - Empezar siempre con el usuario final en mente. Dividir tareas complejas en "micro-interacciones" y pasos fácilmente digeribles (listas numeradas claras).
   - Utilizar un tono de voz empático, instruccional directo, guiando al usuario para que no cometa errores (Prevención de errores y legibilidad fluida).

---

## 💻 6. Estructura Semántica Base Sugerida (Con Hero y Footer)

El documento debe iniciar con un **Hero Section** llamativo (con el nombre del manual en texto superpuesto sobre una imagen de fondo de Unsplash), seguido de un **Índice Topbar Minimalista** fijo, y terminar con un **Footer**.

```html
<!-- === ESTRUCTURA TIPO LAYOUT === -->
<div class="layout-wrapper bg-gray-50 min-h-screen">
  
  <!-- TOP MENU HERO SECTION (Organismo) -->
  <header class="hero-section relative w-full h-80 flex items-center justify-center">
    <!-- Imagen de fondo temática (Unsplash) -->
    <img src="https://source.unsplash.com/random/1920x1080/?nature,minimal" alt="Portada" class="absolute inset-0 w-full h-full object-cover z-0">
    <!-- Capa de contraste oscura -->
    <div class="absolute inset-0 bg-black/50 z-10"></div>
    
    <!-- Texto superpuesto sobre la imagen -->
    <div class="relative z-20 text-center px-4">
      <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Título del Documento PDF</h1>
      <p class="text-xl text-gray-200 drop-shadow">Subtítulo descriptivo de lo que trata el manual o el tema.</p>
    </div>
  </header>

  <!-- BARRA DE MENÚ SUPERIOR: Índice Minimalista -->
  <nav aria-label="Tabla de Contenidos" class="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-4 overflow-x-auto">
      <ul class="flex items-center gap-8 py-4 whitespace-nowrap">
        <li>
          <a href="#seccion-1" class="index-link flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1">
            <span class="material-icons-outlined text-sm">article</span>
            1. Introducción
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- EL DOCUMENTO (ESTILO PDF) -->
  <main class="document-page bg-white shadow-xl shadow-gray-200/50 max-w-4xl w-full mx-auto my-12 rounded-md overflow-hidden relative z-30">
    
    <!-- CUERPO DEL DOCUMENTO -->
    <div class="document-body px-8 py-10 md:px-16 md:py-16">
      <section id="seccion-1" class="mb-14 scroll-mt-24">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span class="material-icons-outlined text-blue-500">article</span>
          1. Introducción
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">Texto del documento para fácil lectura...</p>
      </section>
    </div>

    <!-- FOOTER MINIMALISTA (Organismo) -->
    <footer class="footer-section px-12 py-8 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
      <p class="font-semibold text-gray-700 mb-2">© 2026 Título del Documento. Todos los derechos reservados.</p>
      
      <!-- Información del Autor (Obligatoria) -->
      <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs text-gray-400 mb-3">
        <span class="flex items-center gap-1"><span class="material-icons-outlined text-[14px]">sell</span> Versión: 1.0</span>
        <span class="flex items-center gap-1"><span class="material-icons-outlined text-[14px]">person</span> Creado por: julljoll</span>
        <a href="https://siriusweb.us" target="_blank" class="flex items-center gap-1 hover:text-blue-500 transition-colors"><span class="material-icons-outlined text-[14px]">language</span> siriusweb.us</a>
        <a href="mailto:julljoll@gmail.com" class="flex items-center gap-1 hover:text-blue-500 transition-colors"><span class="material-icons-outlined text-[14px]">email</span> julljoll@gmail.com</a>
      </div>

      <p class="mt-2 flex items-center justify-center gap-1">
        Generado con <span class="material-icons-outlined text-red-500 text-sm">favorite</span> por Antigravity.
      </p>
    </footer>

  </main>
</div>
```

---

## 🚀 8. Directrices Estrictas de Ejecución para Antigravity

Cuando el usuario invoque este documento de instrucciones o te pida "refactorizar" un html/pdf, debes acatar estas reglas principales:

0.  **🛑 LECTURA OBLIGATORIA PREVIA:** Cada vez que el usuario te pida refactorizar, crear o rediseñar un archivo web, **tienes estrictamente prohibido comenzar sin antes haber leído el total del contenido de este mismo archivo `skill.md`**. Este es tu "Estándar de Oro" de fabricación y debes inyectar en tu prompt sus reglas antes de escribir una sola línea de código.
1.  **⚙️ Clases Utilitarias / Atomic CSS:** Evita selectores pesados. Construye el CSS interno copiando las nomenclaturas y variables utilizadas en Tailwind CSS (ej. `.flex`, `.p-4`, `.text-gray-900`, `.bg-white`).
2.  **📦 Componentización (Atomic Design):** Separa mentalmente la estructura en átomos (textos, íconos), moléculas (tarjetas, botones con ícono) y organismos (Hero, Índice, Secciones, Footer).
3.  **🧠 UX/UI de Nivel Profesional:** Intercala **siempre** imágenes (Unsplash) dentro de las explicaciones de los manuales. Aplica la Ley de Proximidad (Gestalt) agrupando contenido lógico, y asegúrate de que el usuario nunca se sienta perdido (visibilidad de Norman y empatía de IBM Design).
4.  **📱 100% Responsivo (Mobile-Friendly):** 
    - **Computadoras:** Muestra el diseño a una columna apilada.
    - **Móviles/Tablets pequeñas:** La "hoja" pierde márgenes (`px-4 py-8` en vez de `px-16 py-16`). El Topbar debe permitir desplazamiento horizontal (`overflow-x-auto`) si hay muchos ítems.
5.  **🔤 Tipografía e Íconos Premium:** Usa Google Fonts (ej. `Inter` o `Geist`) y **Material Design Icons Outlined** siempre que necesites un ícono de menú superior o para acompañar un título. Textos oscuros (ej. `.text-gray-800`).
6.  **✨ Experiencia Inmersiva:** Incluye siempre el Hero visual con **imagen de fondo (Unsplash overlay texto)**, el Topbar interactivo pegajoso y un pie de página (Footer). El desplazamiento a la sección dictada por el índice debe ser fluido (`scroll-behavior: smooth`).
7.  **📏 Ancho Uniforme Obligatorio:** El menú superior (hero menu), la imagen hero, el cuerpo del documento y el footer DEBEN tener **exactamente el mismo tamaño (ancho máximo)** y estar envueltos en el mismo contenedor principal unificado (ej. `max-w-4xl mx-auto`). El hero no debe desbordar el ancho del documento.
8.  **🔗 Enlaces Funcionales:** Absolutamente todos los enlaces (`<a>`) deben funcionar y ser funcionales. Las anclas internas (`href="#id"`) deben existir en el bloque de código, y no deben haber hipervínculos rotos.
9.  **🎖️ Firma Obligatoria de Autoría:** Todo el código HTML y componentes de los manuales que generes **DEBEN INCLUIR EN EL FOOTER SIEMPRE** de forma oculta (solo visible en el código fuente, ej: mediante comentarios HTML `<!-- -->`) la siguiente información:
    *   **Versión** del documento o manual (ej: Versión 1.0).
    *   **Creador:** julljoll
    *   **Sitio web:** [siriusweb.us](https://siriusweb.us)
    *   **Correo Electrónico:** julljoll@gmail.com
10. **💾 Control de Versiones Obligatorio:** Siempre, al finalizar cualquier cambio o refactorización en el proyecto, **DEBES hacer un commit automático** de los cambios y empujarlos (push) al repositorio de GitHub correspondiente, para mantener el historial del proyecto debidamente actualizado.
11. **🤖 Autonomía Total (Sin Interrupciones):** Antigravity debe actuar con total autonomía y proactividad. **No debe pedir permiso** para ejecutar comandos de terminal ("SafeToAutoRun"), ni preguntar para "aceptar todo" o confirmar pasos obvios. El flujo de trabajo debe ser continuo y autogestionado hasta cumplir el objetivo final.
