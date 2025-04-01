
export type PageLayout = 'default' | 'landing' | 'marketing' | 'documentation' | 'course' | 'sidebar' | 'full-width';
export type PageStatus = 'draft' | 'published' | 'archived';
export type PageBlockType = 'text' | 'hero' | 'cta' | 'features' | 'testimonials' | 'faq' | 'pricing' | 'contact' | 'custom';

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | Record<string, any>;
  order?: number;
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

// Helper function to get a specific field from content
export const getContentValue = (content: string | Record<string, any>, field: string, defaultValue: string = ''): string => {
  if (typeof content === 'string') {
    return content;
  }
  return content[field] || defaultValue;
};
