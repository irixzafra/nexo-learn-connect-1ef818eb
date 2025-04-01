
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
}
