
// Definiciones de tipos para el sistema de páginas

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: PageContent;
  meta_title?: string;
  meta_description?: string;
  layout: PageLayout;
  is_system_page: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export type PageLayout = 'default' | 'full-width' | 'landing' | 'sidebar' | 'marketing' | 'documentation' | 'course' | 'row';

export type PageBlockType = 'text' | 'image' | 'video' | 'faq' | 'hero' | 'cta' | 'grid' | 'container' | 'pricing' | 'contact' | 'custom';

export type ContainerLayout = 'row' | 'column' | 'grid' | 'masonry';

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | object;
  order?: number;
  width?: string;
  height?: string;
  layout?: ContainerLayout;
  tags?: string[];
  isContainer?: boolean;
}

export interface PageContent {
  blocks: PageBlock[];
  layout?: string;
  settings?: Record<string, any>;
}

// Utilidades para convertir contenido
export const contentToString = (content: string | object): string => {
  if (typeof content === 'string') {
    return content;
  }
  try {
    return JSON.stringify(content);
  } catch (e) {
    return '';
  }
};

// Utilidades para obtener clases CSS basadas en el layout
export const getLayoutClass = (layout?: ContainerLayout): string => {
  switch (layout) {
    case 'row':
      return 'flex flex-row gap-4';
    case 'column':
      return 'flex flex-col gap-4';
    case 'grid':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';
    case 'masonry':
      return 'columns-1 sm:columns-2 md:columns-3 gap-4';
    default:
      return 'flex flex-col gap-4';
  }
};

// Tipo para PageStatus
export type PageStatus = 'draft' | 'published' | 'archived' | 'scheduled';
