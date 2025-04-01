
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuItem } from '@/types/navigation';

/**
 * Hook para validar si las rutas son válidas y están activas
 */
export const useValidateRoutes = (items: MenuItem[]) => {
  const location = useLocation();
  const [validatedItems, setValidatedItems] = useState<MenuItem[]>(items);
  
  useEffect(() => {
    // Verificar y mejorar los elementos de navegación
    const enhancedItems = items.map(item => {
      // Verificar si la ruta actual coincide con la del elemento
      const isActive = item.path === location.pathname;
      
      // Verificar si hay subelementos y procesarlos
      let processedSubItems = item.items;
      if (item.items && item.items.length > 0) {
        processedSubItems = item.items.map(subItem => {
          const isSubActive = subItem.path === location.pathname;
          return { ...subItem, active: isSubActive };
        });
      }
      
      return {
        ...item,
        active: isActive,
        items: processedSubItems
      };
    });
    
    setValidatedItems(enhancedItems);
  }, [items, location.pathname]);
  
  return validatedItems;
};
