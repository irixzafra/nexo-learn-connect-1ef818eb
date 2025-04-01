export type PageLayout = 'default' | 'landing' | 'marketing' | 'documentation' | 'course' | 'sidebar' | 'full-width';
export type PageStatus = 'draft' | 'published' | 'archived';
export type PageBlockType = 'text' | 'hero' | 'cta' | 'features' | 'testimonials' | 'faq' | 'pricing' | 'contact' | 'custom';
export type ContainerLayout = 'column' | 'row' | 'grid-2' | 'grid-3' | 'grid-4';
export type AccessType = 'public' | 'authenticated' | 'admin';

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | Record<string, any>;
  order?: number;
  tags?: string[];
  width?: string; // Ancho del bloque, podría ser en % o px
  height?: string; // Altura del bloque
  layout?: ContainerLayout; // Layout interno del bloque si es un contenedor
  customStyle?: Record<string, string>; // Estilos personalizados
  isContainer?: boolean; // Indica si es un contenedor que puede contener otros bloques
  childBlocks?: PageBlock[]; // Bloques hijo si es un contenedor
}

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  meta_description?: string;
  content?: {
    blocks: PageBlock[];
  };
  status: PageStatus;
  layout: PageLayout;
  created_at: string;
  updated_at: string;
  is_system_page?: boolean;
  created_by?: string;
  accessType?: AccessType; // Added this property for access control
}

export interface PageRevision {
  id: string;
  page_id: string;
  content: {
    blocks: PageBlock[];
  };
  created_at: string;
  created_by: string;
}

// Helper function to convert content to string for displaying/editing
export const contentToString = (content: string | Record<string, any>): string => {
  if (typeof content === 'string') {
    return content;
  }
  return JSON.stringify(content);
};

// Helper function to safely display content as React nodes
export const renderContent = (content: string | Record<string, any>): string => {
  return contentToString(content);
};

// Helper function to get a specific field from content
export const getContentValue = (content: string | Record<string, any>, field: string, defaultValue: string = ''): string => {
  if (typeof content === 'string') {
    return content;
  }
  return content[field] || defaultValue;
};

// Helper to determine if a block can be resized
export const canBlockBeResized = (block: PageBlock): boolean => {
  // Algunos tipos de bloques pueden no ser redimensionables
  const nonResizableTypes: PageBlockType[] = [];
  return !nonResizableTypes.includes(block.type);
};

// Helper to determine if a block can ser a container
export const canBlockBeContainer = (block: PageBlock): boolean => {
  // Algunos tipos de bloques pueden no ser contenedores
  const nonContainerTypes: PageBlockType[] = ['cta'];
  return !nonContainerTypes.includes(block.type) || !!block.isContainer;
};

// Helper to get layout class based on container layout
export const getLayoutClass = (layout?: ContainerLayout): string => {
  switch (layout) {
    case 'row':
      return 'flex flex-row gap-4';
    case 'grid-2':
      return 'grid grid-cols-1 md:grid-cols-2 gap-4';
    case 'grid-3':
      return 'grid grid-cols-1 md:grid-cols-3 gap-4';
    case 'grid-4':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';
    case 'column':
    default:
      return 'flex flex-col gap-4';
  }
};
