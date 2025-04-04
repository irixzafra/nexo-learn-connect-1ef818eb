
import { useState, useEffect, useCallback } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';
import { 
  fetchNavigationItems, 
  saveNavigationItems, 
  syncNavigationFromCode 
} from '@/services/navigationService';
import { useToast } from '@/components/ui/use-toast';

export const useNavigationItems = (role: UserRoleType) => {
  const [items, setItems] = useState<NavigationItemWithChildren[]>([]);
  const [originalItems, setOriginalItems] = useState<NavigationItemWithChildren[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { toast } = useToast();
  
  const hasUnsavedChanges = JSON.stringify(items) !== JSON.stringify(originalItems);

  // Cargar elementos de navegación para el rol seleccionado
  const loadNavigationItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedItems = await fetchNavigationItems(role);
      setItems(loadedItems);
      setOriginalItems(JSON.parse(JSON.stringify(loadedItems))); // Deep clone
    } catch (error) {
      console.error(`Error cargando navegación para ${role}:`, error);
      toast({
        title: "Error al cargar navegación",
        description: `No se pudo cargar la configuración de navegación para el rol ${role}.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [role, toast]);

  // Actualizar visibilidad de un elemento
  const updateItemVisibility = useCallback((itemId: string, isVisible: boolean) => {
    setItems(prevItems => {
      const updateItemInTree = (items: NavigationItemWithChildren[]): NavigationItemWithChildren[] => {
        return items.map(item => {
          if (item.id === itemId) {
            return { ...item, isVisible };
          }
          if (item.children && item.children.length > 0) {
            return {
              ...item,
              children: updateItemInTree(item.children)
            };
          }
          return item;
        });
      };
      
      return updateItemInTree(prevItems);
    });
  }, []);

  // Reordenar elementos
  const reorderItem = useCallback((newItems: NavigationItemWithChildren[]) => {
    setItems(newItems);
  }, []);

  // Guardar cambios
  const saveNavigationChanges = useCallback(async () => {
    try {
      await saveNavigationItems(role, items);
      setOriginalItems(JSON.parse(JSON.stringify(items))); // Deep clone
      return true;
    } catch (error) {
      console.error('Error al guardar cambios:', error);
      throw error;
    }
  }, [role, items]);

  // Sincronizar con el código
  const syncNavigationWithCode = useCallback(async () => {
    try {
      const updatedItems = await syncNavigationFromCode(role);
      setItems(updatedItems);
      setOriginalItems(JSON.parse(JSON.stringify(updatedItems)));
      return true;
    } catch (error) {
      console.error('Error al sincronizar con el código:', error);
      throw error;
    }
  }, [role]);

  // Cargar elementos iniciales
  useEffect(() => {
    loadNavigationItems();
  }, [loadNavigationItems]);

  return {
    items,
    isLoading,
    updateItemVisibility,
    reorderItem,
    saveNavigationChanges,
    syncNavigationWithCode,
    selectedItem,
    setSelectedItem,
    hasUnsavedChanges
  };
};
