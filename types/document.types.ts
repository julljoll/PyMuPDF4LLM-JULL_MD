export type SectionLayout =
  | 'TEXT_FULL'
  | 'TEXT_IMAGE_RIGHT'
  | 'IMAGE_TEXT_LEFT'
  | 'IMAGE_FULL_WIDTH'
  | 'TWO_COLUMN_EQUAL'
  | 'METRIC_BANNER'
  | 'CALLOUT_BLOCK';

export type CalloutVariant =
  | 'info' | 'warning' | 'success' | 'danger' | 'dark';

export type ColumnAlignment = 'left' | 'center' | 'right';

export interface DocumentImage {
  src: string;                     // URL pública o base64
  alt: string;
  caption?: string;
  figureNumber?: number;
  width?: number | string;          // puntos PDF o porcentaje string
  height?: number | string;
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
  columnWidths: number[];          // porcentajes, deben sumar 100
  columnAlignments?: ColumnAlignment[];
  highlightLastRow?: boolean;
}

export interface KeyMetric {
  value: string | number;
  unit?: string;
  label: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
}

export interface CalloutData {
  variant: CalloutVariant;
  icon?: string;
  title?: string;
  content: string;
}

export type ContentBlock =
  | { type: 'paragraph';  text: string }
  | { type: 'heading2';   text: string }
  | { type: 'heading3';   text: string }
  | { type: 'bullet_list'; items: string[] }
  | { type: 'numbered_list'; items: string[] }
  | { type: 'table';      data: TableData }
  | { type: 'image';      data: DocumentImage }
  | { type: 'callout';    data: CalloutData }
  | { type: 'metrics';    items: KeyMetric[] }
  | { type: 'divider' }
  | { type: 'spacer';     size?: 'sm' | 'md' | 'lg' };

export interface DocumentSection {
  id: string;
  sectionNumber?: string;          // "1", "2.1", "A", etc.
  emoji?: string;
  title: string;
  layout: SectionLayout;
  mainContent: ContentBlock[];
  sideImage?: DocumentImage;       // para layouts TEXT_IMAGE_RIGHT / IMAGE_TEXT_LEFT
  sideContent?: ContentBlock[];    // para layout TWO_COLUMN_EQUAL
  pageBreakBefore?: boolean;       // default: true
}

export interface DocumentCover {
  backgroundImage?: string;        // URL o base64
  logoSrc?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badgeText?: string;              // ej: "9°53'N / 69°35'W · 700 msnm"
  author: {
    name: string;
    role?: string;
    organization?: string;
  };
  date?: string;
  colorScheme?: {
    background?: string;
    accent?: string;
    text?: string;
  };
}

export interface DocumentConfig {
  id: string;
  title: string;
  pageSize: 'A4' | 'LETTER' | 'LEGAL';
  colorScheme?: 'default' | 'green' | 'blue' | 'earth' | 'custom';
  customColors?: Record<string, string>;
  headerText?: {
    left?: string;
    right?: string;
  };
  footerText?: {
    left?: string;
    right?: string;
    center?: string;
  };
  showPageNumbers?: boolean;       // default: true
  cover: DocumentCover;
  sections: DocumentSection[];
}
