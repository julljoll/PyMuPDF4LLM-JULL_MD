# 📄 Creador PDF (Generador de One-Pages Interactivos)

Bienvenido a **Creador PDF**, un repositorio de recursos y lineamientos arquitectónicos de diseño (UI/UX) diseñado para estandarizar e instruir a modelos de IA en la generación de One-Pages enriquecidas para la lectura web simulando documentos o PDFs profesionales.

Este proyecto está construido alrededor del "Estándar de Oro" definido en el archivo principal `skill.md`.

---

## 🎯 Objetivo del Proyecto

El servidor actual como repositorio en GitHub se encarga de proveer a una IA un conjunto estricto de directrices (`script` o `skill`) que enseñan mecánicamente cómo transformar la solicitud de un usuario (para escribir un manual, tutorial, artículo, etc.) en un documento final codificado en un solo archivo `.html`.

El diseño resultante eleva de manera crítica la experiencia de exploración al simular los bordes y estética de una hoja de papel (Dimensión tipo A4 o Carta), pero sumando las ventajas de la interactividad web.

## ⚙️ ¿Cómo Funciona?

El núcleo de este repositorio se centra en las reglas dictaminadas dentro de **`skill.md`**.
Cuando la IA es instruida para crear un nuevo manual, está forzada (mediante lectura previa obligatoria) a inyectar las siguientes reglas estructurales en su desarrollo:

### 1. Arquitectura Técnica (El Código)
- **Atomic Design y Utilitarias:** Se rechaza el uso de pesados y ruidosos marcos CSS externos. Todo el código CSS se inyecta nativamente imitando los esquemas de utilitarias de **Tailwind CSS**, priorizando el rendimiento y limpieza sin cargar librerías.
- **Responsividad Nativa:** Se utilizan Flexbox y Grid sistemáticamente garantizando un diseño amigable tanto en computadoras (formato Desktop de Hero e Índice lateral/superior) como en Móviles.

### 2. Principios UX/UI Cognitivos (El Usuario)
La IA no solo escupe contenido HTML, sino que ha sido "entrenada" sobre este documento para integrar principios ergonómicos empresariales de grandes corporaciones:
- **Ley de Proximidad (Gestalt):** El texto no compite con la imagen. Conviven respetando márgenes cognitivos para facilitar el escaneo del ojo.
- **Minimalismo y Affordance (Don Norman):** Cada línea de sombra, ícono y menú denota clicabilidad obvia sin recargar la interfaz visual (Sin ruido, menos es más).
- **Enfoque Centrado en Usuario (IBM Design):** Los lenguajes utilizados para explicar guías no son robóticos. Emplean lenguaje empático y cajas de información contextuales enfocadas en que el usuario no fracase la ejecución.
- **Explicación Dual (Texto + Imagen):** Es obligatorio en la creación de cada parte o paso del manual incluir fotografías obtenidas dinámicamente de **Unsplash**.

### 3. Estructura de "Organismos" Requeridos
Cada `.html` producido hereda obligatoriamente estas partes:
1.  **Hero Section:** Una superposición envolvente donde la imagen Unsplash abarca todo el ancho, y el texto flota con iluminación contrastada sobre ella.
2.  **Top NavBar (Índice):** Menú de navegación minimalista interactivo que sigue tu lectura (Sticky Top) iluminando con íconos vectoriales Dónde te encuentras en un momento dado en la lectura (IntersectionObserver ligero).
3.  **Documento PDF Centralizado:** La "hoja blanca" central con abundante padding lateral, sombra suave y un contenedor maximizado centrado (Max-W-4xl) para no estresar el recorrido ocular.
4.  **Footer Corporativo:** Una zona firme en la base del documento conteniendo metadatos de versión y datos de autoría exigidos.

## 🧰 Recursos Gráficos Integrados
*   **Google Fonts:** Tipografía limpia y moderna sin-serif típica del software premium (por ej. `Inter`).
*   **Material Design Outlined:** Todos los íconos del índice y descripciones utilizan el formato Outlined de Google Fonts con CSS insertado.
*   **Unsplash Source:** Imágenes temáticas, fotográficas y reales aleatorias usando resolución y recorte específico de las peticiones por URL.

## 🎖️ Autores y Contacto

Estos scripts de orquestación gráfica han sido ensamblados por *julljoll* bajo el dominio Sirius Web. Todo contenido emitido o renderizado con este skill integra este sello de autoría nativo en el output del código generado.

*   **Creador:** julljoll
*   **Versionamiento Estándar:** 1.0
*   **Sitio web Oficial:** [siriusweb.us](https://siriusweb.us)
*   **Contacto Electrónico:** julljoll@gmail.com

---
*Este repositorio es mantenido con fines de desarrollo generativo de interfaces enriquecidas (Generative UI/UX).*
