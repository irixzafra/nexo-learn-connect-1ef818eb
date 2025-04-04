
import { UserRoleType } from '@/types/auth';
import { NavigationMenus, MenuItem } from '@/types/navigation';
import { dashboardNavigation } from './dashboardNavigation';
import { adminNavigation } from './adminNavigation';
import { instructorNavigation } from './instructorNavigation';
import { studentNavigation } from './studentNavigation';
import { learningNavigation } from './learningNavigation';
import { communityNavigation } from './communityNavigation';
import { configurationNavigation } from './configurationNavigation';
import { mainNavigation } from './mainNavigation';
import { exploreNavigation } from './exploreNavigation';
import { academicNavigation } from './academicNavigation';
import { financeNavigation } from './financeNavigation';
import { settingsNavigation } from './settingsNavigation';
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

/**
 * Get the home path based on user role
 * @param role User role
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/app/admin/dashboard';
    case 'instructor':
      return '/app/instructor/dashboard';
    case 'sistemas':
      return '/app/admin/dashboard';
    case 'moderator':
      return '/app/moderator/dashboard';
    case 'content_creator':
      return '/app/content/dashboard';
    default:
      return '/app/dashboard';
  }
};

/**
 * Helper function to safely get menu items from navigation
 * @param navigation Navigation object or array
 * @returns Array of menu items
 */
const getMenuItems = (navigation: MenuItem[] | Record<string, MenuItem[]>): MenuItem[] => {
  if (Array.isArray(navigation)) {
    return navigation;
  } else if (navigation && typeof navigation === 'object' && 'main' in navigation) {
    return navigation.main || [];
  } else {
    return [];
  }
};

/**
 * Get all navigation menus filtered by user role
 * @param role User role
 */
export const getNavigationByRole = (role: UserRoleType): NavigationMenus => {
  return {
    dashboard: filterMenuItemsByRole(Array.isArray(dashboardNavigation) ? dashboardNavigation : [], role),
    main: filterMenuItemsByRole(Array.isArray(mainNavigation) ? mainNavigation : [], role),
    admin: filterMenuItemsByRole(getMenuItems(adminNavigation), role),
    instructor: filterMenuItemsByRole(getMenuItems(instructorNavigation), role),
    student: filterMenuItemsByRole(getMenuItems(studentNavigation), role),
    learning: filterMenuItemsByRole(Array.isArray(learningNavigation) ? learningNavigation : [], role),
    community: filterMenuItemsByRole(Array.isArray(communityNavigation) ? communityNavigation : [], role),
    configuration: filterMenuItemsByRole(getMenuItems(configurationNavigation), role)
  };
};

// Export all navigation configurations
export * from './dashboardNavigation';
export * from './adminNavigation';
export * from './instructorNavigation';
export * from './studentNavigation';
export * from './learningNavigation';
export * from './communityNavigation';
export * from './configurationNavigation';
export * from './mainNavigation';
export * from './exploreNavigation';
export * from './academicNavigation';
export * from './financeNavigation';
export * from './settingsNavigation';
export * from './gamificationNavigation';

// Export types properly with 'export type' syntax for isolatedModules
export type { MenuItem } from '@/types/navigation';
export type { NavigationMenus } from '@/types/navigation';
