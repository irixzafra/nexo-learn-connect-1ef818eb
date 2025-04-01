
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

export type ContainerLayout = PageLayout;

export type PageStatus = 'draft' | 'published' | 'archived';

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

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  meta_description?: string;
  status: PageStatus;
  layout: PageLayout;
  content?: {
    blocks: PageBlock[];
  };
  is_system_page?: boolean;
  updated_at?: string;
  created_at?: string;
  created_by?: string;
  accessType?: 'public' | 'authenticated' | 'admin';
  permissions?: {
    canView: string[];
    canEdit: string[];
    canDelete: string[];
    canPublish: string[];
  };
}

export interface PageRevision {
  id: string;
  page_id: string;
  content: any;
  created_at: string;
  user_id?: string;
  comments?: string;
  version: number;
}

// Helper functions
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

export const getContentValue = (content: any, path?: string): any => {
  if (!path) return content;
  
  const keys = path.split('.');
  let result = content;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  
  return result;
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
