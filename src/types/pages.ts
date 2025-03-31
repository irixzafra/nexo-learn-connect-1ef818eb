
export type PageLayout = 'default' | 'landing' | 'marketing' | 'documentation' | 'course';
export type PageStatus = 'draft' | 'published' | 'archived';
export type PageBlockType = 'text' | 'hero' | 'cta' | 'features' | 'testimonials' | 'faq' | 'pricing' | 'contact' | 'custom';

export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string;
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
}
