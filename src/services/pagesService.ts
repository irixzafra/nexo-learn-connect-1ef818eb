
import { SitePage, PageContent, PageStatus } from '@/types/pages';

// Mock data for simulating API calls
const MOCK_PAGES: SitePage[] = [
  {
    id: '1',
    title: 'Home',
    slug: 'home',
    description: 'Página principal',
    layout: 'landing',
    content: {
      blocks: [
        {
          id: '1',
          type: 'hero',
          content: 'Bienvenido a nuestra plataforma de aprendizaje'
        },
        {
          id: '2',
          type: 'text',
          content: 'Explora nuestros cursos y contenidos'
        }
      ]
    },
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: true,
    accessType: 'public'
  },
  {
    id: '2',
    title: 'Sobre Nosotros',
    slug: 'sobre-nosotros',
    description: 'Conoce nuestro equipo',
    layout: 'default',
    content: {
      blocks: [
        {
          id: '1',
          type: 'text',
          content: 'Somos un equipo apasionado por la educación'
        }
      ]
    },
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: false,
    accessType: 'public'
  }
];

// Simulate API call delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all pages
export const getPages = async (): Promise<SitePage[]> => {
  await delay(500);
  return [...MOCK_PAGES];
};

// Get a page by ID
export const getPageById = async (id: string): Promise<SitePage | null> => {
  await delay(300);
  const page = MOCK_PAGES.find(p => p.id === id);
  return page ? { ...page } : null;
};

// Get a page by slug
export const getPageBySlug = async (slug: string): Promise<SitePage | null> => {
  await delay(300);
  const page = MOCK_PAGES.find(p => p.slug === slug);
  return page ? { ...page } : null;
};

// Create a new page
export const createPage = async (pageData: Partial<SitePage>): Promise<SitePage> => {
  await delay(600);
  
  const newPage: SitePage = {
    id: String(Math.floor(Math.random() * 10000)),
    title: pageData.title || 'Nueva Página',
    slug: pageData.slug || `page-${Date.now()}`,
    description: pageData.description || '',
    layout: pageData.layout || 'default',
    content: pageData.content || { blocks: [] },
    status: pageData.status || 'draft',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_system_page: false,
    accessType: pageData.accessType || 'public'
  };
  
  return newPage;
};

// Update a page
export const updatePage = async (id: string, pageData: Partial<SitePage>): Promise<SitePage> => {
  await delay(600);
  
  // In a real app, this would make an API call to update the page
  console.log('Updating page:', id, pageData);
  
  return {
    id,
    ...pageData,
    updated_at: new Date().toISOString(),
  } as SitePage;
};

// Update page status - added to fix error
export const updatePageStatus = async (id: string, status: PageStatus): Promise<SitePage> => {
  await delay(300);
  
  const page = MOCK_PAGES.find(p => p.id === id);
  if (!page) {
    throw new Error('Page not found');
  }
  
  return {
    ...page,
    status,
    updated_at: new Date().toISOString()
  };
};

// Delete a page - added to fix error
export const deletePage = async (id: string): Promise<void> => {
  await delay(300);
  console.log(`Deleting page with ID ${id}`);
  // In a real app, this would make an API call to delete the page
};

// Check if a slug is unique
export const isSlugUnique = async (slug: string, excludeId?: string): Promise<boolean> => {
  await delay(300);
  
  if (!slug) return false;
  
  const existingPage = MOCK_PAGES.find(p => 
    p.slug === slug && (!excludeId || p.id !== excludeId)
  );
  
  return !existingPage;
};

// Helper to generate a slug from a title
export const generateSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')    // Remove special characters
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
    .replace(/--+/g, '-')        // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, '');    // Remove leading and trailing hyphens
};
