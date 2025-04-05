
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';

/**
 * Filter navigation items based on user role
 * @param items Array of menu items
 * @param role User role
 * @returns Filtered array of menu items visible to the user
 */
export const filterNavigationByRole = (items: MenuItem[], role: UserRoleType): MenuItem[] => {
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

/**
 * Get a home path based on role type
 * @param role User role
 * @returns The default home path for that role
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/app/admin/dashboard';
    case 'instructor':
      return '/app/instructor/dashboard';
    case 'moderator':
      return '/app/moderation/dashboard';
    case 'student':
      return '/app/dashboard';
    default:
      return '/app/dashboard';
  }
};
