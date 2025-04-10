// Define possible page layout options
export type PageLayout = 
  | "default" 
  | "full-width" 
  | "landing" 
  | "sidebar" 
  | "marketing" 
  | "documentation" 
  | "course"
  | "column"
  | "row"
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
  | "grid";

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
  | "custom"
  | "hero"
  | "features"
  | "testimonials"
  | "header";

// Define a page block structure
export interface PageBlock {
  id: string;
  type: PageBlockType | string;
  content: string | Record<string, any>;
  layout?: ContainerLayout;
  order?: number;
  width?: string;
  height?: string;
  tags?: string[];
  isContainer?: boolean;
  childBlocks?: PageBlock[];
}

// Define the site page structure
export interface SitePage {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  content: string | { blocks: PageBlock[] };
  meta_description?: string;
  created_at: string;
  updated_at: string;
  is_system_page: boolean;
  meta_title?: string;
  meta_keywords?: string;
  featured_image?: string;
  author_id?: string;
  parent_id?: string | null;
  layout: PageLayout;
  description?: string;
  accessType?: PageAccessType;
}

export interface PageTreeItem extends SitePage {
  children?: PageTreeItem[];
  level: number;
}

// Define PageContent type that was referenced
export interface PageContent {
  blocks: PageBlock[];
  layout?: string;
}

// Add other relevant types that were referenced in imports
export interface PageData {
  title: string;
  path: string;
  description: string;
  status: string;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  updated?: string;
  component?: string;
  accessType?: 'public' | 'authenticated' | 'admin';
  content?: {
    blocks: PageBlock[];
  };
  permissions?: {
    canView: string[];
    canEdit: string[];
    canDelete: string[];
    canPublish: string[];
  };
}
