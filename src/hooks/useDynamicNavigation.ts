
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from '@/types/navigation';
import { supabase } from '@/integrations/supabase/client';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';
import { NavigationItemWithChildren } from '@/types/navigation-manager';

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
          .contains('visible_to_roles', [role])
          .order('sort_order', { ascending: true });
        
        if (error) {
          console.error("Error al cargar navegación dinámica:", error);
          throw error;
        }
        
        // Si hay datos en la BD, procesarlos para formar la estructura de NavigationMenus
        if (navigationItems && navigationItems.length > 0) {
          console.log("Datos de navegación cargados de Supabase:", navigationItems);
          
          // Convertir estructura plana a jerarquía
          const itemMap: Record<string, NavigationItemWithChildren> = {};
          const rootItems: NavigationItemWithChildren[] = [];
          
          // Primera pasada: crear objetos y mapearlos por ID
          navigationItems.forEach(item => {
            itemMap[item.id] = {
              id: item.id,
              label: item.label,
              iconName: item.icon_name,
              sortOrder: item.sort_order,
              isActive: item.is_active,
              isVisible: item.is_visible,
              path: item.path,
              itemType: item.item_type,
              parentId: item.parent_id || null,
              visibleToRoles: item.visible_to_roles,
              children: []
            };
          });
          
          // Segunda pasada: establecer relaciones jerárquicas
          navigationItems.forEach(item => {
            if (item.parent_id && itemMap[item.parent_id]) {
              if (!itemMap[item.parent_id].children) {
                itemMap[item.parent_id].children = [];
              }
              itemMap[item.parent_id].children?.push(itemMap[item.id]);
            } else {
              rootItems.push(itemMap[item.id]);
            }
          });
          
          // Agrupar elementos por grupo
          const dynamicNavigation: NavigationMenus = {};
          
          rootItems.forEach(rootItem => {
            if (rootItem.itemType === 'group' && rootItem.isVisible) {
              // Crear grupo
              const groupName = rootItem.label;
              dynamicNavigation[groupName] = [];
              
              // Añadir hijos como elementos del grupo
              rootItem.children?.forEach(childItem => {
                if (childItem.isVisible) {
                  dynamicNavigation[groupName].push({
                    label: childItem.label,
                    path: childItem.path,
                    icon: childItem.iconName ? { name: childItem.iconName } : undefined,
                    disabled: !childItem.isActive,
                    requiredRole: childItem.visibleToRoles || [role]
                  });
                }
              });
            }
          });
          
          // Usar la navegación procesada de la BD
          if (Object.keys(dynamicNavigation).length > 0) {
            setNavigationMenus(dynamicNavigation);
            setIsLoading(false);
            return; // Terminar aquí si hemos obtenido la navegación de la BD
          }
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
