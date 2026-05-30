// components/pdf/styles/theme.ts

export const theme = {
  // ── Colores por Defecto (Apple HIG System Colors) ──────────────
  colors: {
    // Primarios y Acentos
    primary:        '#007AFF',   // System Blue
    primaryLight:   '#5856D6',   // System Purple
    accent:         '#34C759',   // System Green
    accentBright:   '#FF9500',   // System Orange / Gold

    // Neutros
    black:          '#000000',   // System Black
    dark:           '#1C1C1E',   // System Dark Gray 1
    mid:            '#8E8E93',   // System Gray
    light:          '#D1D1D6',   // System Light Gray 2
    ultraLight:     '#F2F2F7',   // System Gray 6 / Grouped Background
    cream:          '#FFFFFF',   // System Background (Limpio)
    white:          '#FFFFFF',

    // Semáforo (para datos de estado)
    success:        '#34C759',   // System Green
    warning:        '#FF9500',   // System Orange
    danger:         '#FF3B30',   // System Red
    info:           '#007AFF',   // System Blue

    // Portada
    coverBg:        '#007AFF',   // Fondo System Blue
    coverAccent:    '#FF9500',   // Acento System Orange
    coverText:      '#FFFFFF',
    coverSubtext:   '#E5E5EA',   // System Gray 4
    coverLowerBg:   '#1C1C1E',   // System Dark Gray
  },

  // ── Tipografía ───────────────────────────────────────────────
  fonts: {
    primary:   'Helvetica',
    heading:   'Helvetica-Bold',
    italic:    'Helvetica-Oblique',
    boldItalic: 'Helvetica-BoldOblique',
  },
  
  fontSizes: {
    coverTitle:    46,
    coverSubtitle: 14,
    h1:            13.5,
    h2:            11,
    h3:            10,
    body:          9.5,
    small:         8.5,
    caption:       8,
    tableHeader:   8.5,
    tableBody:     8.5,
    metric:        28,
    metricLabel:   8,
    pageNumber:    8,
  },

  // ── Espaciado (grilla de 8pt) ────────────────────────────────
  spacing: {
    xs:   4,
    sm:   8,
    md:   16,
    lg:   24,
    xl:   32,
    xxl:  48,
    xxxl: 64,
  },

  // ── Layout de página ─────────────────────────────────────────
  page: {
    size:    'LEGAL',
    width:   612,
    height:  1008,
    margins: {
      top:    40,
      bottom: 36,
      left:   48,
      right:  48,
    },
    headerHeight: 28,
    footerHeight: 22,
  },

  // ── Bordes y radios (Estilo Apple HIG con 10pt de radio) ─────
  borders: {
    thin:   0.5,
    normal: 1,
    thick:  2,
    accent: 3,
    radius: 10,  // Esquina redondeada Apple HIG
  },
} as const;

export type Theme = typeof theme;
export type ThemeColors = Record<keyof typeof theme.colors, string>;

// Helper para obtener el color del esquema seleccionado en la config
export const getThemeColors = (scheme?: string, customColors?: Record<string, string>): ThemeColors => {
  if (scheme === 'custom' && customColors) {
    return { ...theme.colors, ...customColors } as any;
  }
  
  // Esquema Cromático de La Cigarronera (Verdes, Dorado y Ocre)
  if (scheme === 'green' || scheme === 'cigarronera') {
    return {
      ...theme.colors,
      primary:        '#1B4332',   // Verde Selva Profundo
      primaryLight:   '#2D6A4F',   // Verde Agronómico
      accent:         '#52B788',   // Verde Pitahaya
      accentBright:   '#D4A017',   // Dorado Fruto Maduro
      ultraLight:     '#EAF4EE',   // Zebra
      cream:          '#FAFAF5',   // Fondo crema
      success:        '#2D6A4F',
      warning:        '#D4A017',
      danger:         '#8B5E3C',   // Tierra Larense / Ocre
      coverBg:        '#1B4332',
      coverAccent:    '#D4A017',
      coverSubtext:   '#B7E4C7',
      coverLowerBg:   '#0D2818',
    };
  }

  // Esquema Blue (HIG Original)
  if (scheme === 'blue') {
    return theme.colors; // Retorna los colores de System Blue por defecto
  }

  // Esquema Earth (Tonos Ocre y Marrón HIG)
  if (scheme === 'earth') {
    return {
      ...theme.colors,
      primary: '#8B5E3C',      // Tierra
      primaryLight: '#A67B5B',
      accent: '#D4A017',       // Dorado
      accentBright: '#E76F51', // Terracota
      ultraLight: '#FFF8EE',
      cream: '#FAFAF5',
      coverBg: '#8B5E3C',
      coverLowerBg: '#5C3D24',
    };
  }

  // Por defecto retorna los colores HIG estándar (System Blue)
  return theme.colors;
};
