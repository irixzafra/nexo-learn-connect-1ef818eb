
import { UserRoleType } from '@/types/auth';
import { NavigationMenus, MenuItem } from '@/types/navigation';
import { 
  adminNavigation, 
  instructorNavigation, 
  studentNavigation, 
  getNavigationByRole,
  getHomePathByRole
} from './roleBasedNavigation';
import { dashboardNavigation } from './dashboardNavigation';
import { learningNavigation } from './learningNavigation';
import { communityNavigation } from './communityNavigation';
import { gamificationNavigation } from './gamificationNavigation';

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

// Export everything for usage
export {
  adminNavigation,
  instructorNavigation,
  studentNavigation,
  dashboardNavigation,
  learningNavigation,
  communityNavigation,
  gamificationNavigation,
  getNavigationByRole,
  getHomePathByRole
};

// Export types
export type { MenuItem, NavigationMenus };
