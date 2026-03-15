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

## 📑 5. Índice Interactivo Minimalista (Tabla de Contenidos)

El documento debe incluir una barra de navegación que actúe como índice.

### Detalles Visuales
- **Estilo:** Minimalismo extremo. Sin cajas cerradas ni colores de fondo pesados.
- **Tipografía del Índice:** Fuente limpia, legible, algo más pequeña que el texto principal, color gris atenuado (`#6b7280` o similar).
- **Estado Activo/Hover:** 
  - Transición suave a un texto más oscuro (`#111827`) o al color primario del tema.
  - *Indicador visual sutil:* Una línea vertical fina a la izquierda del elemento activo (ej. `border-left: 2px solid var(--color-primario);`).
- **Posicionamiento:** Debe mantenerse fijo en pantalla acompañando la lectura (`position: sticky; top: 2rem;` o `top: 4rem;`).

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
   - **Visibilidad y *Affordance*:** Los elementos interactivos (como el Índice Lateral) deben sugerir claramente que son clicables (cambio de color al *hover*, cursor *pointer*, indicadores de estado de desplazamiento).
   - **Carga Cognitiva Reducida:** Menos es más. Limpiar el diseño de ruidos visuales. Cada línea de texto, sombra, o color debe tener un propósito claro; si no aporta funcionalidad o estética directa, elimínalo (Minimalismo Funcional).
4. **IBM Design Thinking (Enfoque en el Usuario):**
   - Empezar siempre con el usuario final en mente. Dividir tareas complejas en "micro-interacciones" y pasos fácilmente digeribles (listas numeradas claras).
   - Utilizar un tono de voz empático, instruccional directo, guiando al usuario para que no cometa errores (Prevención de errores y legibilidad fluida).

---

## 💻 6. Estructura Semántica Base Sugerida (Con Hero y Footer)

El documento debe iniciar con un **Hero Section** llamativo (título, subtítulo e imagen de Unsplash de portada) y terminar con un **Footer** minimalista.

```html
<!-- === ESTRUCTURA TIPO LAYOUT === -->
<div class="layout-wrapper max-w-7xl mx-auto flex gap-12 px-4 py-8 relative">
  
  <!-- BARRA LATERAL: Índice Minimalista -->
  <aside class="sidebar-index sticky top-16 w-64 shrink-0">
    <nav aria-label="Tabla de Contenidos">
      <ul class="flex flex-col gap-3">
        <li>
          <a href="#seccion-1" class="index-link flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <span class="material-icons-outlined text-sm">chevron_right</span>
            1. Introducción
          </a>
        </li>
      </ul>
    </nav>
  </aside>

  <!-- EL DOCUMENTO (ESTILO PDF) -->
  <main class="document-page bg-white shadow-xl shadow-gray-200/50 max-w-3xl w-full rounded-md overflow-hidden">
    
    <!-- TOP MENU / HERO SECTION (Organismo) -->
    <header class="hero-section relative">
      <img src="https://source.unsplash.com/random/800x400/?nature,minimal" alt="Portada" class="w-full h-64 object-cover">
      <div class="px-12 py-10 bg-gray-50 border-b border-gray-100">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Título del Documento PDF</h1>
        <p class="text-lg text-gray-600">Subtítulo descriptivo de lo que trata el manual o el tema.</p>
      </div>
    </header>

    <!-- CUERPO DEL DOCUMENTO -->
    <div class="document-body px-12 py-10">
      <section id="seccion-1" class="mb-12 scroll-mt-24">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span class="material-icons-outlined text-blue-500">article</span>
          1. Introducción
        </h2>
        <p class="text-gray-700 leading-relaxed mb-6">Texto del documento para fácil lectura...</p>
      </section>
    </div>

    <!-- FOOTER MINIMALISTA (Organismo) -->
    <footer class="footer-section px-12 py-6 bg-gray-50 border-t border-gray-100 text-center text-sm text-gray-500">
      <p>© 2026 Título del Documento. Todos los derechos reservados.</p>
      <p class="mt-1 flex items-center justify-center gap-1">
        Generado con <span class="material-icons-outlined text-red-500 text-sm">favorite</span> por Antigravity.
      </p>
    </footer>

  </main>
</div>
```

---

## 🚀 8. Directrices Estrictas de Ejecución para Antigravity

Cuando el usuario invoque este documento de instrucciones, debes acatar estas reglas principales:

1.  **⚙️ Clases Utilitarias / Atomic CSS:** Evita selectores pesados. Construye el CSS interno copiando las nomenclaturas y variables utilizadas en Tailwind CSS (ej. `.flex`, `.p-4`, `.text-gray-900`, `.bg-white`).
2.  **📦 Componentización (Atomic Design):** Separa mentalmente la estructura en átomos (textos, íconos), moléculas (tarjetas, botones con ícono) y organismos (Hero, Índice, Secciones, Footer).
3.  **🧠 UX/UI de Nivel Profesional:** Intercala **siempre** imágenes (Unsplash) dentro de las explicaciones de los manuales. Aplica la Ley de Proximidad (Gestalt) agrupando contenido lógico, y asegúrate de que el usuario nunca se sienta perdido (visibilidad de Norman y empatía de IBM Design).
4.  **📱 100% Responsivo (Mobile-Friendly):** 
    - **Computadoras:** Muestra el diseño a dos columnas (Índice lateral + Documento centrado).
    - **Móviles/Tablets pequeñas:** La "hoja" pierde márgenes (`px-4 py-6` en vez de `px-12 py-10`). El Índice Lateral se mueve encima del Hero o se vuelve un "menú hamburguesa". La imagen de Unsplash debe escalar como `object-cover`.
5.  **🔤 Tipografía e Íconos Premium:** Usa Google Fonts (ej. `Inter` o `Geist`) y **Material Design Icons Outlined** siempre que necesites acompañar un título o un enlace del índice. Textos oscuros (ej. `.text-gray-800`), NO negros puros (`#000`).
6.  **✨ Experiencia Inmersiva:** Incluye siempre un Header/Hero visual con foto de **Unsplash** y un pie de página (Footer). El desplazamiento a la sección dictada por el índice debe ser fluido (`scroll-behavior: smooth`).
