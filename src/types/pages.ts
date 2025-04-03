
export type PageStatus = 'published' | 'draft' | 'archived';

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  content: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  is_system_page: boolean;
  meta_title?: string;
  meta_keywords?: string;
  featured_image?: string;
  author_id?: string;
  parent_id?: string | null;
}

export interface PageTreeItem extends SitePage {
  children?: PageTreeItem[];
  level: number;
}
