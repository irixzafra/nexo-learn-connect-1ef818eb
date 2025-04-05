
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { getNavigationByRole } from '@/config/navigation';

// Fetch navigation items for a specific role
export const fetchNavigationItems = async (
  role: UserRoleType
): Promise<NavigationItemWithChildren[]> => {
  // In a real application, this would fetch from an API
  // For now, we'll use the static configuration
  try {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Convert the navigation structure from config to NavigationItemWithChildren
    const navigationConfig = getNavigationByRole(role);
    const navigationItems: NavigationItemWithChildren[] = [];
    
    // Process each section as a group
    Object.entries(navigationConfig).forEach(([groupName, items], groupIndex) => {
      const groupId = `group-${groupIndex}`;
      
      // Create a group item
      const groupItem: NavigationItemWithChildren = {
        id: groupId,
        label: groupName,
        iconName: 'FolderOpen',
        itemType: 'group',
        isVisible: true,
        isActive: true,
        sortOrder: groupIndex,
        visibleToRoles: [role],
        children: []
      };
      
      // Add menu items as children
      items.forEach((item, itemIndex) => {
        const childItem: NavigationItemWithChildren = {
          id: `${groupId}-item-${itemIndex}`,
          label: item.label,
          iconName: 'ChevronRight', // Default icon
          path: item.path,
          itemType: 'link',
          isVisible: true,
          isActive: !item.disabled,
          sortOrder: itemIndex,
          parentId: groupId,
          visibleToRoles: item.requiredRole ? item.requiredRole : [role]
        };
        
        groupItem.children?.push(childItem);
      });
      
      navigationItems.push(groupItem);
    });
    
    return navigationItems;
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
};

// Save navigation items
export const saveNavigationItems = async (
  role: UserRoleType,
  items: NavigationItemWithChildren[]
): Promise<NavigationItemWithChildren[]> => {
  // In a real application, this would save to an API
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    console.log('Saved navigation items for role:', role, items);
    return items;
  } catch (error) {
    console.error('Error saving navigation items:', error);
    throw error;
  }
};

// Sync navigation from code (static configuration)
export const syncNavigationFromCode = async (
  role: UserRoleType
): Promise<NavigationItemWithChildren[]> => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // This would typically fetch the latest navigation structure from code/config
    // and merge it with any customizations stored in the database
    return await fetchNavigationItems(role);
  } catch (error) {
    console.error('Error syncing navigation from code:', error);
    throw error;
  }
};

export const sortNavigationItems = (
  items: NavigationItemWithChildren[]
): NavigationItemWithChildren[] => {
  return [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
};
