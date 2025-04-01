
import { useState, useEffect } from 'react';
import { MenuItem } from '@/types/navigation';
import { isValidPath } from '@/utils/routeValidation';

/**
 * Hook that validates route paths in navigation items
 * @param items Navigation items array to validate
 * @returns Array of navigation items with active property indicating validity
 */
export function useValidateRoutes(items: MenuItem[]): (MenuItem & { active: boolean })[] {
  const [validatedItems, setValidatedItems] = useState<(MenuItem & { active: boolean })[]>([]);
  
  useEffect(() => {
    if (!items || !items.length) {
      setValidatedItems([]);
      return;
    }
    
    // Process each menu item and check if its path is valid
    const processedItems = items.map(item => {
      // For items with path property, validate the path
      let isActive = true;
      
      if (item.path && typeof item.path === 'string' && !item.external) {
        isActive = isValidPath(item.path);
      }
      
      // Return the original item with the added active property
      return {
        ...item,
        active: isActive
      };
    });
    
    setValidatedItems(processedItems);
  }, [items]);
  
  return validatedItems;
}
