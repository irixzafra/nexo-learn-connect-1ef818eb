
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { useDynamicNavigation } from '@/hooks/useDynamicNavigation';

export const useGetNavigation = () => {
  const [navigationTree, setNavigationTree] = useState<NavigationItemWithChildren[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userRole } = useAuth();
  const { getNavigationItemsByRole } = useDynamicNavigation();

  useEffect(() => {
    const loadNavigationItems = async () => {
      if (!userRole) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const items = await getNavigationItemsByRole(userRole);
        
        // Convertir la lista plana en un árbol jerárquico
        const createNavigationTree = (items: any[], parentId: string | null = null): any[] => {
          return items
            .filter(item => item.parentId === parentId)
            .map(item => ({
              ...item,
              children: createNavigationTree(items, item.id)
            }))
            .sort((a, b) => a.sortOrder - b.sortOrder);
        };

        const treeItems = createNavigationTree(items);
        setNavigationTree(treeItems);
      } catch (error) {
        console.error('Error al cargar la navegación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavigationItems();
  }, [userRole]);

  return { navigationTree, isLoading };
};
