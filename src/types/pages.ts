
export type PageLayout = 
  | 'default' 
  | 'full-width' 
  | 'landing' 
  | 'sidebar' 
  | 'marketing' 
  | 'documentation' 
  | 'course'
  | 'row'
  | 'column'
  | 'grid-2'
  | 'grid-3'
  | 'grid-4';

export type PageBlockType = 'text' | 'hero' | 'features' | 'image' | 'video' | 'cta' | 'faq' | 'testimonials';

export type ContainerLayout = 'row' | 'column' | 'grid-2' | 'grid-3' | 'grid-4';

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | Record<string, any>;
  width?: string;
  height?: string;
  tags?: string[];
  layout?: ContainerLayout;
  isContainer?: boolean;
  order?: number;
}

export interface PageContent {
  blocks: PageBlock[];
}

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: PageContent;
  status: 'draft' | 'published' | 'archived';
  layout: PageLayout;
  created_at: string;
  updated_at: string;
  is_system_page: boolean;
  meta_description?: string;
  accessType?: 'public' | 'authenticated' | 'admin';
}

export const contentToString = (content: string | Record<string, any>): string => {
  if (typeof content === 'string') {
    return content;
  }
  return JSON.stringify(content);
};

export const getLayoutClass = (layout?: ContainerLayout): string => {
  switch (layout) {
    case 'row':
      return 'flex flex-row items-center gap-4';
    case 'column':
      return 'flex flex-col gap-4';
    case 'grid-2':
      return 'grid grid-cols-1 md:grid-cols-2 gap-4';
    case 'grid-3':
      return 'grid grid-cols-1 md:grid-cols-3 gap-4';
    case 'grid-4':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';
    default:
      return '';
  }
};
