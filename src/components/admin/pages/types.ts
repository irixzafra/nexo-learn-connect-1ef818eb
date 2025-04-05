

export interface PageData {
  id?: string;
  title: string;
  path: string;
  description: string;
  status: string;
  category: string;
  importance?: 'high' | 'medium' | 'low';
  updated?: string;
  component?: string;
  accessType?: 'public' | 'authenticated' | 'admin' | 'student' | 'instructor';
  navigation?: string | string[];
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

export interface PageBlock {
  id: string; // Changed from optional to required to match the type in types/pages.ts
  type: string;
  content: string | Record<string, any>;
  order?: number;
}

