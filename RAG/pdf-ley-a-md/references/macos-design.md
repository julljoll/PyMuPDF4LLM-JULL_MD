# Referencia: Diseño macOS / Apple HIG para Web

## Principios Apple Human Interface Guidelines adaptados a web

1. **Claridad** — El texto es legible, los iconos precisos, los ornamentos sutiles
2. **Deferencia** — La UI cede protagonismo al contenido
3. **Profundidad** — Capas visuales y movimiento fluido transmiten jerarquía

---

## Paleta de colores del sistema macOS

```css
/* Colores del sistema (Light) */
--macos-blue:   #007AFF;   /* Acción principal */
--macos-green:  #34C759;   /* Éxito */
--macos-red:    #FF3B30;   /* Destructivo / Error */
--macos-yellow: #FFCC00;   /* Advertencia */
--macos-orange: #FF9500;
--macos-purple: #AF52DE;
--macos-pink:   #FF2D55;
--macos-teal:   #5AC8FA;
--macos-gray:   #8E8E93;   /* Texto secundario */
--macos-gray2:  #AEAEB2;
--macos-gray3:  #C7C7CC;
--macos-gray4:  #D1D1D6;
--macos-gray5:  #E5E5EA;
--macos-gray6:  #F2F2F7;   /* Fondo tabla alternado */
```

---

## Efectos de vidrio (Vibrancy)

```css
/* Sidebar - blur más fuerte */
.sidebar {
  background: rgba(246, 246, 246, 0.85);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);
}

/* Barra de herramientas */
.toolbar {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(20px) saturate(180%);
}

/* Popover / Sheet */
.popover {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(40px) saturate(200%);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}

/* Dark mode */
.dark .sidebar {
  background: rgba(28, 28, 30, 0.85);
}
.dark .toolbar {
  background: rgba(44, 44, 46, 0.72);
}
```

---

## Tipografía SF Pro

```css
/* Sistema: SF Pro se carga automáticamente en macOS/iOS */
body {
  font-family: -apple-system, BlinkMacSystemFont,
               "SF Pro Display", "SF Pro Text",
               "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Jerarquía tipográfica macOS */
.title-1  { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
.title-2  { font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
.title-3  { font-size: 20px; font-weight: 600; }
.headline { font-size: 17px; font-weight: 600; }
.body     { font-size: 17px; font-weight: 400; }
.callout  { font-size: 16px; font-weight: 400; }
.subhead  { font-size: 15px; font-weight: 400; }
.footnote { font-size: 13px; font-weight: 400; }
.caption  { font-size: 12px; font-weight: 400; }
.caption2 { font-size: 11px; font-weight: 400; }
```

---

## Sombras macOS

```css
/* Window shadow - profundidad de ventana flotante */
.shadow-window {
  box-shadow:
    0 22px 70px rgba(0,0,0,0.20),
    0 8px 20px rgba(0,0,0,0.12),
    0 2px 6px rgba(0,0,0,0.08);
}

/* Card shadow - elemento elevado */
.shadow-card {
  box-shadow:
    0 4px 16px rgba(0,0,0,0.12),
    0 1px 4px rgba(0,0,0,0.08);
}

/* Popover */
.shadow-popover {
  box-shadow:
    0 10px 40px rgba(0,0,0,0.15),
    0 2px 8px rgba(0,0,0,0.10),
    inset 0 1px 0 rgba(255,255,255,0.5);
}
```

---

## Bordes y formas

```css
/* Border radius consistente */
--radius-xs: 4px;    /* Tags, badges */
--radius-sm: 6px;    /* Botones pequeños */
--radius-md: 8px;    /* Inputs, cards compactos */
--radius-lg: 10px;   /* Cards, paneles */
--radius-xl: 14px;   /* Ventanas, modales */
--radius-2xl: 20px;  /* Sheets grandes */

/* Borde sutil (no usar border negro puro) */
.border-macos {
  border: 0.5px solid rgba(0, 0, 0, 0.12);
}
.dark .border-macos {
  border: 0.5px solid rgba(255, 255, 255, 0.12);
}
```

---

## Botones estilo macOS

```tsx
/* Botón primario (azul sistema) */
<button className="
  bg-macos-blue hover:bg-blue-600 active:bg-blue-700
  text-white text-sm font-medium
  px-4 py-1.5 rounded-macos
  transition-all duration-100
  shadow-[0_1px_2px_rgba(0,0,0,0.2)]
  active:shadow-none active:translate-y-px
">
  Acción Principal
</button>

/* Botón secundario (gris sistema) */
<button className="
  bg-secondary hover:bg-secondary/80 active:bg-secondary/60
  text-sm font-medium
  px-4 py-1.5 rounded-macos
  border border-border
  transition-all duration-100
">
  Acción Secundaria
</button>
```

---

## Progress bar estilo macOS

```tsx
<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-macos-blue rounded-full"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  />
</div>
```

---

## Animaciones macOS (spring physics)

```ts
// Spring estilo macOS (overshot suave)
const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
}

// Ease macOS estándar
const easeStandard = [0.25, 0.46, 0.45, 0.94]

// Ease para entradas (aceleración desde cero)
const easeDecelerate = [0.0, 0.0, 0.2, 1.0]

// Ease para salidas (desaceleración hasta cero)
const easeAccelerate = [0.4, 0.0, 1.0, 1.0]
```

---

## Componentes de referencia

| Componente | Clase Tailwind equivalente |
|---|---|
| Sidebar macOS | `glass-sidebar w-64 border-r border-border/50` |
| Toolbar | `glass h-11 border-b border-border/50 flex items-center px-4` |
| Card flotante | `bg-card rounded-macos-lg shadow-macos-sm border border-border/50` |
| Badge sistema | `text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground` |
| Input macOS | `bg-muted border border-border rounded-macos px-3 py-1.5 text-sm focus:ring-1 focus:ring-macos-blue` |
| Divider | `border-t border-border/50 my-2` |
