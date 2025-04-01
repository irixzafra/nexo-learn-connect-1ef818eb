
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
  | 'column'
  | 'row'
  | 'grid-2'
  | 'grid-3'
  | 'grid-4';

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
}
