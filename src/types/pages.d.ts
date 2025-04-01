
export type PageStatus = 'published' | 'draft' | 'archived';

export type PageLayout = 
  | 'default' 
  | 'landing' 
  | 'marketing' 
  | 'documentation' 
  | 'course' 
  | 'sidebar' 
  | 'full-width'
  | 'column'
  | 'row'
  | 'grid-2'
  | 'grid-3'
  | 'grid-4';

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content?: string | { blocks: PageBlock[] };
  status: PageStatus;
  layout: PageLayout;
  meta_description?: string;
  meta_keywords?: string;
  is_system_page: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  component?: string;
  category?: string;
}

export type PageBlockType = 
  | 'text' 
  | 'hero' 
  | 'cta' 
  | 'features' 
  | 'testimonials' 
  | 'faq' 
  | 'pricing' 
  | 'contact' 
  | 'custom';

export type ContainerLayout = PageLayout;

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | Record<string, any>;
  order?: number;
  layout?: PageLayout;
  width?: string;
  height?: string;
  isContainer?: boolean;
  tags?: string[];
  childBlocks?: PageBlock[];
}

export const contentToString = (content: string | Record<string, any>): string => {
  if (typeof content === 'string') {
    return content;
  }
  
  if (content && typeof content === 'object') {
    if (content.text) return content.text;
    if (content.title) return content.title;
    if (content.content) return contentToString(content.content);
    
    return JSON.stringify(content);
  }
  
  return '';
};

export const getLayoutClass = (layout?: PageLayout): string => {
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
