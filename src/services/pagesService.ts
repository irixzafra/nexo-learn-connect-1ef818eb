
import { SitePage } from '@/types/pages';

// Mock data for development
const mockPages: SitePage[] = [
  {
    id: '1',
    title: 'Home Page',
    slug: 'home',
    content: { 
      blocks: [
        { id: 'block-1', type: 'text', content: 'Welcome to our platform!' },
        { id: 'block-2', type: 'hero', content: 'Learn and Grow With Us' }
      ] 
    },
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
    content: { 
      blocks: [
        { id: 'block-3', type: 'text', content: 'Learn more about our company.' }
      ] 
    },
    status: 'published',
    layout: 'default',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: false
  }
];

/**
 * Get a page by its slug
 */
export const getPageBySlug = async (slug: string): Promise<SitePage | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const page = mockPages.find(page => page.slug === slug);
      resolve(page || null);
    }, 500);
  });
};

/**
 * Get all pages
 */
export const getAllPages = async (): Promise<SitePage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPages]);
    }, 500);
  });
};

/**
 * Update page status
 */
export const updatePageStatus = async (pageId: string, status: 'draft' | 'published' | 'archived'): Promise<SitePage | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pageIndex = mockPages.findIndex(page => page.id === pageId);
      if (pageIndex === -1) {
        resolve(null);
        return;
      }
      
      const updatedPage = {
        ...mockPages[pageIndex],
        status,
        updated_at: new Date().toISOString()
      };
      
      // In a real implementation, this would update the database
      resolve(updatedPage);
    }, 500);
  });
};

/**
 * Delete a page
 */
export const deletePage = async (pageId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pageIndex = mockPages.findIndex(page => page.id === pageId);
      if (pageIndex === -1) {
        resolve(false);
        return;
      }
      
      // In a real implementation, this would delete from the database
      resolve(true);
    }, 500);
  });
};
