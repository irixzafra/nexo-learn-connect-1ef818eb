
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from '@/types/navigation';
import { supabase } from '@/integrations/supabase/client';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';

/**
 * Hook para obtener la navegación dinámica basada en el rol del usuario
 */
export const useDynamicNavigation = (role: UserRoleType) => {
  const [navigationMenus, setNavigationMenus] = useState<NavigationMenus>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setIsLoading(true);
        
        // Intentar cargar la navegación desde la BD primero
        const { data: navigationItems, error } = await supabase
          .from('navigation_items')
          .select('*')
          .eq('role', role)
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Error al cargar navegación dinámica:", error);
          throw error;
        }
        
        // Si hay datos en la BD, procesarlos
        if (navigationItems && navigationItems.length > 0) {
          // Aquí procesaríamos los elementos de la BD para convertirlos en NavigationMenus
          // Por ahora, como fallback, usamos la navegación estática si no hay implementación
          console.log("Datos de navegación cargados de Supabase:", navigationItems);
        }
        
        // Como fallback o si no hay datos en la BD, usar navegación estática
        const staticNavigation = getNavigationByRole(role);
        setNavigationMenus(staticNavigation);
        
      } catch (err) {
        console.error("Error en useDynamicNavigation:", err);
        setError(err as Error);
        
        // Fallback a navegación estática en caso de error
        const staticNavigation = getNavigationByRole(role);
        setNavigationMenus(staticNavigation);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNavigation();
  }, [role]);
  
  return {
    navigationMenus,
    isLoading,
    error
  };
};
