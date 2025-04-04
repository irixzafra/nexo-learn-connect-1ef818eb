
import { UserRoleType } from '@/types/auth';
import { NavigationMenus, MenuItem } from '@/types/navigation';
import { 
  adminNavigation, 
  instructorNavigation, 
  studentNavigation, 
  getNavigationByRole as getRoleBasedNavigation,
  getHomePathByRole as getHomePathByRoleType
} from './roleBasedNavigation';

// Re-exportar navegación basada en roles
export const getNavigationByRole = getRoleBasedNavigation;
export const getHomePathByRole = getHomePathByRoleType;

/**
 * Filter menu items based on user role
 * @param items Array of menu items
 * @param role User role
 */
export const filterMenuItemsByRole = (items: MenuItem[], role: UserRoleType): MenuItem[] => {
  if (!Array.isArray(items)) {
    console.warn('Expected items to be an array, got:', typeof items);
    return [];
  }
  
  return items.filter(item => {
    // If no required role is specified, show the item to everyone
    if (!item.requiredRole) return true;
    
    // Check if the user's role matches any of the required roles
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(role);
    }
    
    // Check if the user's role matches the required role
    return item.requiredRole === role;
  });
};

// Legacy exports for backward compatibility - estas serán reemplazadas gradualmente
export * from './dashboardNavigation';
export * from './mainNavigation';
export * from './learningNavigation';
export * from './communityNavigation';
export * from './configurationNavigation';
export * from './exploreNavigation';
export * from './academicNavigation';
export * from './financeNavigation';
export * from './settingsNavigation';
export * from './gamificationNavigation';
export * from './adminNavigation';
export * from './instructorNavigation';
export * from './studentNavigation';

// Export types properly with 'export type' syntax for isolatedModules
export type { MenuItem } from '@/types/navigation';
export type { NavigationMenus } from '@/types/navigation';

// Exportar la nueva navegación basada en roles
export { 
  adminNavigation, 
  instructorNavigation, 
  studentNavigation 
};
