
import { SitePage } from "@/types/pages";

// Función para verificar si un slug es único
export const isSlugUnique = async (slug: string, pageId?: string): Promise<boolean> => {
  // En una implementación real, verificaríamos en la base de datos
  // Por ahora, simulamos el comportamiento
  return true;
};

// Función para obtener una página por su ID
export const getPageById = async (id: string): Promise<SitePage | null> => {
  // Simular la obtención de una página por ID
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

// Función para actualizar una página
export const updatePage = async (id: string, pageData: Partial<SitePage>): Promise<SitePage> => {
  // Simular la actualización de una página
  console.log(`Updating page with ID: ${id}`, pageData);
  return {
    ...await getPageById(id) as SitePage,
    ...pageData,
    updated_at: new Date().toISOString()
  };
};
