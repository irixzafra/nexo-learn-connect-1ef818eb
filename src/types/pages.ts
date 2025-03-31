
export type PageStatus = 'draft' | 'published' | 'archived';

export type PageLayout = 'default' | 'landing' | 'sidebar' | 'full-width';

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: any;
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
  content: any;
  meta_description?: string;
  created_at: string;
  created_by?: string;
  revision_notes?: string;
}
