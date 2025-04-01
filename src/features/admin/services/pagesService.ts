
import { SitePage } from '@/types/pages';

/**
 * Create a new page
 */
export const createPage = async (pageData: Partial<SitePage>): Promise<SitePage | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPage: SitePage = {
        id: `page-${Date.now()}`,
        title: pageData.title || 'New Page',
        slug: pageData.slug || `page-${Date.now()}`,
        content: pageData.content || { blocks: [] },
        status: pageData.status || 'draft',
        layout: pageData.layout || 'default',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_system_page: false,
        ...pageData
      };
      
      // In a real implementation, this would save to the database
      resolve(newPage);
    }, 500);
  });
};

/**
 * Get all pages for admin management
 */
export const getAllPages = async (): Promise<SitePage[]> => {
  // This would typically fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content: { blocks: [] },
          status: 'published',
          layout: 'default',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_system_page: true
        },
        {
          id: '2',
          title: 'About Us',
          slug: 'about',
          content: { blocks: [] },
          status: 'published',
          layout: 'default',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_system_page: false
        }
      ]);
    }, 500);
  });
};

/**
 * Update page status
 */
export const updatePageStatus = async (pageId: string, status: 'draft' | 'published' | 'archived'): Promise<SitePage | null> => {
  // Implementation would connect to API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: pageId,
        title: 'Updated Page',
        slug: 'updated-page',
        content: { blocks: [] },
        status,
        layout: 'default',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_system_page: false
      });
    }, 500);
  });
};

/**
 * Delete a page
 */
export const deletePage = async (pageId: string): Promise<boolean> => {
  // Implementation would connect to API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
