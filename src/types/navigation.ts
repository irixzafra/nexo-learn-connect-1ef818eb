
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from './auth';

export interface MenuItem {
  icon?: LucideIcon;
  label: string;
  path?: string;
  url?: string;
  badge?: number; // Ensuring this is only number type
  requiredRole?: UserRoleType | UserRoleType[];
  isHighlighted?: boolean;
  disabled?: boolean;
  submenu?: MenuItem[];
}

export type NavigationMenus = Record<string, MenuItem[]>;
