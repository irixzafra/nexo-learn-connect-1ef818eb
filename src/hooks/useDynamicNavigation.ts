
import { useEffect, useState } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationMenus } from '@/types/navigation';
import { fetchNavigationItems } from '@/services/navigationService';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';

export const useDynamicNavigation = (role: UserRoleType) => {
  const [navigationMenus, setNavigationMenus] = useState<NavigationMenus>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDynamicNavigation = async () => {
      setIsLoading(true);
      try {
        // Intentar cargar navegación dinámica
        const dynamicItems = await fetchNavigationItems(role);
        
        if (dynamicItems && dynamicItems.length > 0) {
          // Convertir los items dinámicos al formato NavigationMenus
          const menus: NavigationMenus = {};
          
          dynamicItems.forEach(group => {
            if (group.isVisible && group.isActive) {
              const groupItems = group.children
                ?.filter(item => item.isVisible && item.isActive)
                .map(item => {
                  // Obtener el nombre del icono dinámicamente
                  const IconComponent = item.iconName 
                    ? require('lucide-react')[item.iconName]
                    : undefined;
                  
                  return {
                    icon: IconComponent,
                    label: item.label,
                    path: item.path,
                    requiredRole: item.requiredRoles,
                    disabled: !item.isActive,
                    isHighlighted: false
                  };
                }) || [];
              
              if (groupItems.length > 0) {
                menus[group.label.toLowerCase()] = groupItems;
              }
            }
          });
          
          setNavigationMenus(menus);
        } else {
          // Fallback a navegación estática
          const staticNavigation = getNavigationByRole(role);
          setNavigationMenus(staticNavigation);
        }
      } catch (error) {
        console.error('Error loading dynamic navigation:', error);
        // Fallback a navegación estática
        const staticNavigation = getNavigationByRole(role);
        setNavigationMenus(staticNavigation);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDynamicNavigation();
  }, [role]);
  
  return { navigationMenus, isLoading };
};
