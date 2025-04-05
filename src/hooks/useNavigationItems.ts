
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { fetchNavigationItems, saveNavigationItems, syncNavigationFromCode } from '@/services/navigationService';

export const useNavigationItems = (role: UserRoleType) => {
  const [items, setItems] = useState<NavigationItemWithChildren[]>([]);
  const [originalItems, setOriginalItems] = useState<NavigationItemWithChildren[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Load items when role changes
  useEffect(() => {
    loadItems();
  }, [role]);

  // Function to load navigation items
  const loadItems = async () => {
    setIsLoading(true);
    try {
      const loadedItems = await fetchNavigationItems(role);
      setItems(loadedItems);
      setOriginalItems(JSON.parse(JSON.stringify(loadedItems))); // Deep clone
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Error loading navigation items:', err);
      setError(err instanceof Error ? err : new Error('Failed to load navigation items'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update an item's visibility
  const updateItemVisibility = (itemId: string, isVisible: boolean) => {
    const updateVisibility = (items: NavigationItemWithChildren[]): NavigationItemWithChildren[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, isVisible };
        }
        if (item.children && item.children.length > 0) {
          return { ...item, children: updateVisibility(item.children) };
        }
        return item;
      });
    };

    const updatedItems = updateVisibility(items);
    setItems(updatedItems);
    setHasUnsavedChanges(true);
  };

  // Function to reorder items
  const reorderItem = (newOrder: NavigationItemWithChildren[]) => {
    setItems(newOrder);
    setHasUnsavedChanges(true);
  };

  // Function to save navigation changes
  const saveNavigationChanges = async () => {
    setIsLoading(true);
    try {
      await saveNavigationItems(role, items);
      setOriginalItems(JSON.parse(JSON.stringify(items))); // Deep clone
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Error saving navigation changes:', err);
      setError(err instanceof Error ? err : new Error('Failed to save navigation changes'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to sync navigation with code
  const syncNavigationWithCode = async () => {
    setIsLoading(true);
    try {
      const syncedItems = await syncNavigationFromCode(role);
      setItems(syncedItems);
      setOriginalItems(JSON.parse(JSON.stringify(syncedItems))); // Deep clone
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Error syncing navigation with code:', err);
      setError(err instanceof Error ? err : new Error('Failed to sync navigation with code'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    loadItems,
    updateItemVisibility,
    reorderItem,
    saveNavigationChanges,
    syncNavigationWithCode,
    hasUnsavedChanges,
    selectedItem,
    setSelectedItem
  };
};

export default useNavigationItems;
