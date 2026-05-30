# 📄 Creador PDF (Next.js PDF Generator Framework)

Bienvenido a **Creador PDF**, un framework moderno y profesional basado en **Next.js** y **`@react-pdf/renderer`** para la generación programática de documentos PDF de alta calidad editorial. 

Este proyecto está diseñado para estandarizar la creación de informes técnicos, comerciales y agrícolas complejos (como el informe del predio **La Cigarronera**), permitiendo a desarrolladores e inteligencias artificiales generar PDFs consistentes a partir de datos estructurados.

El núcleo arquitectónico y las directrices detalladas de diseño se encuentran en el archivo principal [skill.md](file:///c:/Users/jull/Documents/crearpdf/skill.md).

---

## 🏗️ Arquitectura del Sistema

El framework está construido sobre las siguientes tecnologías y principios:
*   **Next.js 14+ (App Router):** Estructura modular de páginas y rutas API nativas.
*   **TypeScript (Strict Mode):** Tipado seguro para toda la estructura de configuración del documento.
*   **@react-pdf/renderer:** Motor de renderizado vectorial de PDFs en servidor y previsualización interactiva en cliente.
*   **Tailwind CSS:** Utilizado exclusivamente para la interfaz de control del navegador (el preview y editor web).
*   **Diseño Modular:** Portadas, tablas, métricas y bloques de información desacoplados y parametrizados.

---

## ⚡ Guía de Inicio Rápido en 5 Pasos

### Paso 1: Instalación de Dependencias
Instala los paquetes necesarios en tu proyecto Next.js:
```bash
npm install @react-pdf/renderer lucide-react zod zustand
npm install -D typescript @types/node @types/react
```

### Paso 2: Configurar los Tokens de Diseño (`theme.ts`)
Define tu paleta de colores, fuentes y márgenes en `components/pdf/styles/theme.ts`. El sistema de "La Cigarronera" utiliza por defecto tonos verdes, dorados y ocre:
```typescript
export const theme = {
  colors: {
    primary: '#1B4332',     // Verde Selva Profundo
    accent: '#0F3460',      // Azul / Verde Acento
    accentBright: '#D4A017',// Dorado Fruto
    cream: '#FAFAF5',       // Fondo de página
    // ...
  },
  // ...
};
```

### Paso 3: Definir la Estructura del Documento (`DocumentConfig`)
Crea tu archivo JSON de entrada de datos respetando la estructura tipada en `types/document.types.ts`. Este JSON define la portada, las cabeceras, y el contenido por secciones con sus layouts específicos.

### Paso 4: Iniciar el Servidor de Desarrollo
Inicia Next.js para visualizar el editor e interactuar con el PDFViewer en tiempo real:
```bash
npm run dev
```
Accede a `http://localhost:3000` para abrir el panel de control interactivo.

### Paso 5: Generar y Consumir el PDF
Realiza una solicitud POST a la ruta API `/api/generate-pdf` enviando el JSON de configuración para obtener el archivo binario del PDF.

---

## 🛠️ Guía de Extensión y Uso

### 1. Cómo agregar una nueva sección al PDF
Para añadir una sección, simplemente agrega un nuevo elemento al arreglo `sections` en tu JSON de entrada (ej: `data/sample-document.json`). No necesitas escribir código CSS:
```json
{
  "id": "seccion-nueva",
  "sectionNumber": "12",
  "title": "Nueva Sección de Análisis",
  "layout": "TEXT_IMAGE_RIGHT",
  "mainContent": [
    {
      "type": "paragraph",
      "text": "Este es el texto descriptivo que aparecerá en la columna izquierda..."
    }
  ],
  "sideImage": {
    "src": "https://images.unsplash.com/photo-...",
    "alt": "Imagen descriptiva",
    "caption": "Fig. 20 — Análisis fotográfico detallado."
  }
}
```

### 2. Cómo cambiar el esquema de color
El framework admite temas predefinidos o colores personalizados. Puedes configurar el parámetro `colorScheme` en el JSON principal o editar directamente `components/pdf/styles/theme.ts` para cambiar globalmente el aspecto visual del documento sin alterar los componentes.

### 3. Cómo usar la API desde otro servicio
La API responde a peticiones HTTP POST externas enviando el PDF listo para descargar.
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d @document-config.json \
  --output informe.pdf \
  https://tu-dominio.com/api/generate-pdf
```

---

## 🎖️ Autores y Licencia

*   **Creador:** julljoll
*   **Sitio Web:** [siriusweb.us](https://siriusweb.us)
*   **Licencia:** Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](file:///c:/Users/jull/Documents/crearpdf/LICENSE) para más detalles.
