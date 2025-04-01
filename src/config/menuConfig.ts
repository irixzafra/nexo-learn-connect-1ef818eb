
import { UserRoleType } from '@/types/auth';
import { 
  MenuItem, 
  NavigationMenus,
  mainNavigation,
  adminNavigation,
  gamificationNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
} from './navigation';

// Re-export everything for backward compatibility
export {
  mainNavigation,
  adminNavigation,
  gamificationNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
};

// Re-export types
export type { MenuItem, NavigationMenus };
