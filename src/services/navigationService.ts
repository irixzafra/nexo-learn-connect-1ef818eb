
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { UserRoleType } from '@/types/auth';
import { getNavigationByRole } from '@/config/navigation';

// Function to fetch navigation items from API or local storage
export const fetchNavigationItems = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  // For now, we'll convert the navigation menus to navigation items
  // In a real implementation, this would come from the database
  const navMenus = getNavigationByRole(role);
  
  // Convert NavigationMenus to NavigationItemWithChildren[]
  const items: NavigationItemWithChildren[] = [];
  
  Object.entries(navMenus).forEach(([groupName, menuItems], groupIndex) => {
    // Create a group item
    const groupId = `group-${groupIndex}`;
    const groupItem: NavigationItemWithChildren = {
      id: groupId,
      label: groupName,
      sortOrder: groupIndex,
      isActive: true,
      isVisible: true,
      itemType: 'group',
      children: []
    };
    
    // Add child items
    menuItems.forEach((menuItem, itemIndex) => {
      const childId = `${groupId}-item-${itemIndex}`;
      groupItem.children?.push({
        id: childId,
        label: menuItem.label,
        iconName: menuItem.icon ? menuItem.icon.name : undefined,
        path: menuItem.path,
        sortOrder: itemIndex,
        isActive: !menuItem.disabled,
        isVisible: true,
        itemType: 'link',
        parentId: groupId,
        visibleToRoles: Array.isArray(menuItem.requiredRole) 
          ? menuItem.requiredRole 
          : menuItem.requiredRole ? [menuItem.requiredRole] : undefined
      });
    });
    
    items.push(groupItem);
  });
  
  return items;
};

// Function to save navigation items
export const saveNavigationItems = async (role: UserRoleType, items: NavigationItemWithChildren[]): Promise<void> => {
  console.log(`Saving navigation items for role: ${role}`, items);
  // In a real application, this would be an API call to update the navigation
  localStorage.setItem(`navigation_${role}`, JSON.stringify(items));
};

// Function to sort navigation items
export const sortNavigationItems = (items: NavigationItemWithChildren[]): NavigationItemWithChildren[] => {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
};

// Function to sync navigation from code definitions
export const syncNavigationFromCode = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  // Get navigation from code definitions
  const items = await fetchNavigationItems(role);
  
  // In a real application, this would merge existing customizations with the code definition
  console.log(`Syncing navigation for role: ${role} with code definition`, items);
  
  // Pretend we're saving to the backend
  await saveNavigationItems(role, items);
  
  return items;
};

export default {
  fetchNavigationItems,
  saveNavigationItems,
  sortNavigationItems,
  syncNavigationFromCode
};
