
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
    blocks: {
      id: string;
      type: string;
      content: string | Record<string, any>;
      order?: number;
      tags?: string[];
      width?: string;
      height?: string;
      layout?: 'column' | 'row' | 'grid-2' | 'grid-3' | 'grid-4';
      isContainer?: boolean;
      childBlocks?: Array<any>;
    }[];
  };
  permissions?: {
    canView: string[];
    canEdit: string[];
    canDelete: string[];
    canPublish: string[];
  };
}
