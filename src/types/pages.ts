
// Define possible page layout options
export type PageLayout = 
  | "default" 
  | "full-width" 
  | "landing" 
  | "sidebar" 
  | "marketing" 
  | "documentation" 
  | "course"
  | "grid"
  | "row"
  | "column"
  | "grid-2"
  | "grid-3"
  | "grid-4";

// Define possible page status values
export type PageStatus = 
  | "draft" 
  | "published" 
  | "archived"
  | "scheduled";

// Define page access types
export type PageAccessType = 
  | "public" 
  | "authenticated" 
  | "admin" 
  | "specific-role";

// Define layout for containers
export type ContainerLayout = 
  | "row" 
  | "column" 
  | "grid"
  | "masonry";

// Define available block types
export type PageBlockType = 
  | "text" 
  | "image" 
  | "video" 
  | "cta" 
  | "grid" 
  | "faq" 
  | "pricing" 
  | "contact" 
  | "container" 
  | "hero"
  | "features"
  | "testimonials"
  | "custom";

// Define a page block structure
export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | object;
  layout?: ContainerLayout;
  order?: number;
  width?: string;
  height?: string;
  tags?: string[];
  isContainer?: boolean;
}

// Define the site page structure
export interface SitePage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  layout: PageLayout;
  content?: PageContent | string;
  is_system_page: boolean;
  status: PageStatus;
  meta_title?: string;
  meta_description?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  accessType?: PageAccessType;
}

// Define page content structure
export interface PageContent {
  blocks: PageBlock[];
  layout?: string;
  settings?: Record<string, any>;
}

// Utility functions
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
