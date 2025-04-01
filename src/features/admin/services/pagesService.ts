
import { SitePage } from "@/types/pages";

// Check if a slug is unique
export const isSlugUnique = async (slug: string, pageId?: string): Promise<boolean> => {
  // In a real implementation, we would check in the database
  // For now, simulate the behavior
  return true;
};

// Get a page by ID
export const getPageById = async (id: string): Promise<SitePage | null> => {
  // Simulate fetching a page by ID
  return {
    id: id,
    title: "Página de ejemplo",
    slug: "ejemplo",
    description: "Descripción de la página de ejemplo",
    layout: "default",
    is_system_page: false,
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

// Update a page
export const updatePage = async (id: string, pageData: Partial<SitePage>): Promise<SitePage> => {
  // Simulate updating a page
  console.log(`Updating page with ID: ${id}`, pageData);
  return {
    ...await getPageById(id) as SitePage,
    ...pageData,
    updated_at: new Date().toISOString()
  };
};

// Add missing methods referenced in error messages
export const createPage = async (pageData: Omit<SitePage, "id" | "created_at" | "updated_at">): Promise<SitePage> => {
  // Simulate creating a page
  console.log('Creating new page:', pageData);
  return {
    id: Math.random().toString(36).substring(2, 11),
    ...pageData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

export const updatePageStatus = async (id: string, status: string): Promise<SitePage> => {
  // Simulate updating a page status
  console.log(`Updating page status for ID: ${id} to: ${status}`);
  const page = await getPageById(id);
  if (!page) throw new Error('Page not found');
  
  return {
    ...page,
    status: status as any,
    updated_at: new Date().toISOString()
  };
};

export const deletePage = async (id: string): Promise<void> => {
  // Simulate deleting a page
  console.log(`Deleting page with ID: ${id}`);
  // In a real implementation, this would delete from the database
};

export const getAllPages = async (): Promise<SitePage[]> => {
  // Simulate getting all pages
  return [
    {
      id: '1',
      title: "Página de inicio",
      slug: "inicio",
      description: "Página principal",
      layout: "default",
      is_system_page: true,
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      title: "Acerca de",
      slug: "acerca-de",
      description: "Acerca de nosotros",
      layout: "default",
      is_system_page: false,
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
};
