
// Define possible page layout options
export type PageLayout = 
  | "default" 
  | "full-width" 
  | "landing" 
  | "sidebar" 
  | "marketing" 
  | "documentation" 
  | "course"
  | "grid";

// Define possible page status values
export type PageStatus = 
  | "draft" 
  | "published" 
  | "archived";

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
  | "custom";

// Define a page block structure
export interface PageBlock {
  id: string;
  type: PageBlockType;
  content: string | object;
  layout?: ContainerLayout;
  order?: number;
  width?: string;
  height?: string;
  tags?: string[];
  isContainer?: boolean;
}

// Define the site page structure
export interface SitePage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  layout: PageLayout;
  content?: PageBlock[] | string;
  is_system_page: boolean;
  status: PageStatus;
  meta_title?: string;
  meta_description?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}
