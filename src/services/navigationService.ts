
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
        requiredRoles: Array.isArray(item.requiredRole) 
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
      .eq('role', role)
      .order('sortOrder', { ascending: true });
    
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
        ...item,
        children: []
      };
    });
    
    // Segunda pasada: establecer relaciones jerárquicas
    items.forEach(item => {
      if (item.parentId && itemMap[item.parentId]) {
        if (!itemMap[item.parentId].children) {
          itemMap[item.parentId].children = [];
        }
        itemMap[item.parentId].children?.push(itemMap[item.id]);
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
      ...itemWithoutChildren,
      parentId
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
      .eq('role', role);
    
    if (deleteError) {
      console.error('Error deleting navigation items:', deleteError);
      throw deleteError;
    }
    
    // Insertar los nuevos elementos
    const { error: insertError } = await supabase
      .from('navigation_items')
      .insert(flatItems.map(item => ({ ...item, role })));
    
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
    // Convertir la navegación estática a formato dinámico
    const items = convertStaticNavigationToItems(role);
    
    // Guardar en la BD
    await saveNavigationItems(role, items);
    
    return items;
  } catch (error) {
    console.error('Error in syncNavigationFromCode:', error);
    throw error;
  }
};
