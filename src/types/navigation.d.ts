
import { UserRoleType } from './auth';
import { IconName } from './icon-types';

export interface MenuItem {
  label: string;
  path: string;
  icon?: IconName | React.FC<{ className?: string }>;
  requiredRole?: UserRoleType | UserRoleType[];
  badge?: number;
  isHighlighted?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}

export interface NavigationMenus {
  [category: string]: MenuItem[];
}
