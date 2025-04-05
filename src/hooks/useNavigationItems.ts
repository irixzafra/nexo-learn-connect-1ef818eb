
import { useState, useEffect } from 'react';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { useAuth } from '@/contexts/auth';
import { 
  fetchNavigationItems,
  saveNavigationItems,
  syncNavigationFromCode
} from '@/services/navigationService';

export const useNavigationItems = () => {
  const [items, setItems] = useState<NavigationItemWithChildren[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { effectiveRole } = useAuth();
  
  const loadItems = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const navigationItems = await fetchNavigationItems();
      setItems(navigationItems);
    } catch (err) {
      console.error('Error loading navigation items:', err);
      setError(err instanceof Error ? err : new Error('Failed to load navigation items'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateItems = async (newItems: NavigationItemWithChildren[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await saveNavigationItems(newItems);
      setItems(newItems);
    } catch (err) {
      console.error('Error updating navigation items:', err);
      setError(err instanceof Error ? err : new Error('Failed to update navigation items'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const syncItems = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await syncNavigationFromCode();
      // Reload items after sync
      await loadItems();
    } catch (err) {
      console.error('Error syncing navigation:', err);
      setError(err instanceof Error ? err : new Error('Failed to sync navigation from code'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load items on component mount and when effectiveRole changes
  useEffect(() => {
    loadItems();
  }, [effectiveRole]);
  
  return {
    items,
    isLoading,
    error,
    loadItems,
    updateItems,
    syncItems
  };
};

export default useNavigationItems;
