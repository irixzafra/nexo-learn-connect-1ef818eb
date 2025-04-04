
import { UserRoleType } from '@/types/auth';
import { 
  MenuItem, 
  NavigationMenus,
  adminNavigation,
  instructorNavigation,
  studentNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
} from './navigation';

// Re-export everything for backward compatibility
export {
  adminNavigation,
  instructorNavigation,
  studentNavigation,
  filterMenuItemsByRole,
  getHomePathByRole,
  getNavigationByRole
};

// Re-export types
export type { MenuItem, NavigationMenus };
