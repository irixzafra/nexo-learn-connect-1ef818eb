
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { getNavigationByRole } from '@/config/navigation/roleBasedNavigation';
import { supabase } from '@/integrations/supabase/client';

// Función para convertir la estructura estática del código a la estructura dinámica
const convertStaticNavigationToItems = (role: UserRoleType): NavigationItemWithChildren[] => {
  const staticNavigation = getNavigationByRole(role);
  const result: NavigationItemWithChildren[] = [];
  
  Object.entries(staticNavigation).forEach(([groupName, groupItems], groupIndex) => {
    // Crear grupo
    const groupId = `${role}-group-${groupIndex}`;
    const groupItem: NavigationItemWithChildren = {
      id: groupId,
      label: groupName,
      sortOrder: groupIndex,
      isActive: true,
      isVisible: true,
      itemType: 'group',
      children: []
    };
    
    // Crear items del grupo
    groupItems.forEach((item, itemIndex) => {
      const itemId = `${groupId}-item-${itemIndex}`;
      groupItem.children?.push({
        id: itemId,
        label: item.label,
        iconName: item.icon?.name,
        path: item.path,
        sortOrder: itemIndex,
        isActive: !item.disabled,
        isVisible: true,
        itemType: 'link',
        parentId: groupId,
        visibleToRoles: Array.isArray(item.requiredRole) 
          ? item.requiredRole 
          : item.requiredRole ? [item.requiredRole] : undefined
      });
    });
    
    result.push(groupItem);
  });
  
  return result;
};

// Función para obtener elementos de navegación desde la BD
export const fetchNavigationItems = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  try {
    // Intentar obtener elementos de la BD
    const { data: items, error } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('visible_to_roles', role)
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching navigation items:', error);
      throw error;
    }
    
    if (!items || items.length === 0) {
      // Si no hay elementos en la BD, convertir desde estáticos
      return convertStaticNavigationToItems(role);
    }
    
    // Convertir la estructura plana de la BD a una estructura jerárquica
    const itemMap: Record<string, NavigationItemWithChildren> = {};
    const rootItems: NavigationItemWithChildren[] = [];
    
    // Primera pasada: crear objetos y mapearlos por ID
    items.forEach(item => {
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
    items.forEach(item => {
      if (item.parent_id && itemMap[item.parent_id]) {
        if (!itemMap[item.parent_id].children) {
          itemMap[item.parent_id].children = [];
        }
        itemMap[item.parent_id].children?.push(itemMap[item.id]);
      } else {
        rootItems.push(itemMap[item.id]);
      }
    });
    
    return rootItems;
  } catch (error) {
    console.error('Error in fetchNavigationItems:', error);
    // Fallback a navegación estática
    return convertStaticNavigationToItems(role);
  }
};

// Función para aplanar la estructura jerárquica para guardar en BD
const flattenNavigationItems = (items: NavigationItemWithChildren[]): any[] => {
  const result: any[] = [];
  
  const processItem = (item: NavigationItemWithChildren, parentId: string | null = null) => {
    const { children, ...itemWithoutChildren } = item;
    result.push({
      id: item.id,
      label: item.label,
      icon_name: item.iconName,
      sort_order: item.sortOrder,
      is_active: item.isActive,
      is_visible: item.isVisible,
      path: item.path,
      item_type: item.itemType,
      parent_id: parentId,
      visible_to_roles: item.visibleToRoles || []
    });
    
    children?.forEach(child => processItem(child, item.id));
  };
  
  items.forEach(item => processItem(item));
  return result;
};

// Función para guardar elementos de navegación en la BD
export const saveNavigationItems = async (role: UserRoleType, items: NavigationItemWithChildren[]): Promise<boolean> => {
  try {
    const flatItems = flattenNavigationItems(items);
    
    // Eliminar elementos existentes para este rol
    const { error: deleteError } = await supabase
      .from('navigation_items')
      .delete()
      .contains('visible_to_roles', [role]);
    
    if (deleteError) {
      console.error('Error deleting navigation items:', deleteError);
      throw deleteError;
    }
    
    // Insertar los nuevos elementos
    const { error: insertError } = await supabase
      .from('navigation_items')
      .insert(flatItems.map(item => ({ 
        ...item, 
        visible_to_roles: [...new Set([...item.visible_to_roles, role])]
      })));
    
    if (insertError) {
      console.error('Error inserting navigation items:', insertError);
      throw insertError;
    }
    
    return true;
  } catch (error) {
    console.error('Error in saveNavigationItems:', error);
    throw error;
  }
};

// Función para sincronizar desde el código
export const syncNavigationFromCode = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  try {
    // 1. Obtener elementos actuales de la BD
    const { data: existingItems, error: fetchError } = await supabase
      .from('navigation_items')
      .select('*')
      .contains('visible_to_roles', [role]);
      
    if (fetchError) throw fetchError;
    
    // 2. Convertir estructura estática a formato dinámico
    const codeItems = convertStaticNavigationToItems(role);
    
    // 3. Crear mapa de elementos existentes para fácil acceso
    const existingItemsMap = new Map();
    existingItems?.forEach(item => {
      // Usar una clave compuesta para identificar elementos equivalentes
      const key = `${item.label}-${item.path || ''}`;
      existingItemsMap.set(key, item);
    });
    
    // 4. Preparar elementos a insertar/actualizar
    const itemsToUpsert = [];
    
    for (const item of flattenNavigationItems(codeItems)) {
      // Generar clave compuesta para buscar equivalente
      const key = `${item.label}-${item.path || ''}`;
      const existingItem = existingItemsMap.get(key);
      
      if (existingItem) {
        // El elemento ya existe - mantener configuración de visibilidad y orden
        itemsToUpsert.push({
          ...item,
          id: existingItem.id,
          is_visible: existingItem.is_visible,
          sort_order: existingItem.sort_order,
          // Asegurar que el rol actual está en visible_to_roles
          visible_to_roles: [...new Set([...(existingItem.visible_to_roles || []), role])]
        });
        
        // Marcar como procesado para identificar elementos a desactivar después
        existingItemsMap.delete(key);
      } else {
        // Nuevo elemento - agregar con valores predeterminados
        itemsToUpsert.push({
          ...item,
          visible_to_roles: [role]
        });
      }
    }
    
    // 5. Marcar como inactivos elementos que ya no existen en el código
    // (pero no eliminarlos para preservar relaciones y referencias)
    for (const [_, item] of existingItemsMap.entries()) {
      itemsToUpsert.push({
        ...item,
        is_active: false
      });
    }
    
    // 6. Guardar cambios en la BD
    const { error: upsertError } = await supabase
      .from('navigation_items')
      .upsert(itemsToUpsert);
      
    if (upsertError) throw upsertError;
    
    // 7. Devolver la estructura actualizada
    return fetchNavigationItems(role);
  } catch (error) {
    console.error('Error in syncNavigationFromCode:', error);
    throw error;
  }
};
