
export type PageStatus = 'published' | 'draft' | 'archived';

export type PageLayout = 
  | 'default' 
  | 'landing' 
  | 'marketing' 
  | 'documentation' 
  | 'course' 
  | 'sidebar' 
  | 'full-width'
  | 'column'; // Añadimos "column" como layout válido

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content?: string;
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
