
export type PageStatus = 'draft' | 'published' | 'archived';
export type PageLayout = 'default' | 'landing' | 'marketing' | 'documentation' | 'course';

export interface PageBlock {
  id: string;
  type: 'text' | 'hero' | 'cta' | 'features' | 'testimonials' | 'faq' | 'pricing' | 'contact' | 'custom';
  content: any;
}

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content?: {
    blocks: PageBlock[];
  };
  meta_description?: string;
  status: PageStatus;
  layout: PageLayout;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_system_page: boolean;
}

export interface PageRevision {
  id: string;
  page_id: string;
  content?: {
    blocks: PageBlock[];
  };
  meta_description?: string;
  created_at: string;
  created_by?: string;
  revision_notes?: string;
}
