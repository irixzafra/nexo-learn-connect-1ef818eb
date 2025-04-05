
import { useEffect, useState } from 'react';
import { routeMap } from '@/utils/routeUtils';
import { useGetNavigation } from '@/hooks/useGetNavigation';
import { NavigationItemWithChildren } from '@/types/navigation-manager';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const useBreadcrumbs = (currentPath: string) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { navigationTree, isLoading: isNavLoading } = useGetNavigation();

  useEffect(() => {
    if (!currentPath || isNavLoading) {
      setIsLoading(true);
      return;
    }

    const generateBreadcrumbs = () => {
      // Eliminar parámetros de consulta y fragmentos
      const cleanPath = currentPath.split('?')[0].split('#')[0];
      
      // Dividir la ruta en segmentos
      const pathSegments = cleanPath.split('/').filter((segment) => segment);
      
      // Si estamos en la raíz, no hay breadcrumbs
      if (pathSegments.length === 0) {
        setBreadcrumbs([]);
        setIsLoading(false);
        return;
      }

      // Generar breadcrumbs basados en la navegación
      const generatedBreadcrumbs: BreadcrumbItem[] = [];
      let currentItem: NavigationItemWithChildren | undefined;
      let accumulatedPath = '';

      // Intentar encontrar la ruta en el árbol de navegación
      const findRouteInNavTree = (
        items: NavigationItemWithChildren[] | undefined,
        pathToFind: string
      ): NavigationItemWithChildren | undefined => {
        if (!items) return undefined;
        
        for (const item of items) {
          // Verificar este item
          if (item.path && item.path === pathToFind) {
            return item;
          }
          
          // Verificar los hijos
          if (item.children) {
            const found = findRouteInNavTree(item.children, pathToFind);
            if (found) return found;
          }
        }
        
        return undefined;
      };

      // Recorrer los segmentos de la ruta y construir los breadcrumbs
      for (let i = 0; i < pathSegments.length; i++) {
        accumulatedPath += `/${pathSegments[i]}`;
        
        // Buscar este segmento en el árbol de navegación
        currentItem = findRouteInNavTree(navigationTree, accumulatedPath);
        
        // Si se encontró el ítem, añadir al breadcrumb
        if (currentItem) {
          generatedBreadcrumbs.push({
            label: currentItem.label,
            path: accumulatedPath,
          });
        } else {
          // Si no se encuentra en la navegación, intentar con un mapa de nombres estáticos
          // o utilizar el segmento de la URL capitalizado como respaldo
          const segmentCapitalized = 
            pathSegments[i].charAt(0).toUpperCase() + 
            pathSegments[i].slice(1).replace(/-/g, ' ');
          
          generatedBreadcrumbs.push({
            label: getStaticPageName(accumulatedPath) || segmentCapitalized,
            path: accumulatedPath,
          });
        }
      }

      setBreadcrumbs(generatedBreadcrumbs);
      setIsLoading(false);
    };

    generateBreadcrumbs();
  }, [currentPath, navigationTree, isNavLoading]);

  // Función auxiliar para obtener nombres de página estáticos para rutas conocidas
  const getStaticPageName = (path: string): string | undefined => {
    const staticRoutes: Record<string, string> = {
      '/app/dashboard': 'Dashboard',
      '/app/admin/dashboard': 'Panel Admin',
      '/app/admin/users': 'Usuarios',
      '/app/admin/courses': 'Cursos',
      '/app/admin/roles': 'Roles',
      '/app/admin/features': 'Características',
      '/app/admin/navigation-manager': 'Gestor de Navegación',
      '/app/admin/navigation-diagram': 'Diagrama de Navegación',
      '/app/instructor/dashboard': 'Panel Instructor',
      '/app/instructor/courses': 'Mis Cursos',
      '/app/my-courses': 'Mis Cursos',
      '/app/explore-courses': 'Explorar Cursos',
    };
    
    return staticRoutes[path];
  };

  return { breadcrumbs, isLoading };
};
