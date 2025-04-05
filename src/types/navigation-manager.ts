
import { UserRoleType } from '@/types/auth';
import { LucideIcon } from 'lucide-react';
import { IconName } from '@/types/icon-types';

// Base navigation item interface
export interface NavigationItemBase {
  id?: string;
  path: string;
  label: string;
  icon?: IconName | LucideIcon | string;
  requiredRole?: UserRoleType | UserRoleType[];
  badge?: number;
  isHighlighted?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
  isActive?: boolean;
  sort?: number;
  parent_id?: string | null;
}

// Navigation item with children support
export interface NavigationItemWithChildren extends NavigationItemBase {
  children?: NavigationItemWithChildren[];
}

// Navigation menus organized by categories
export interface NavigationMenus {
  [category: string]: NavigationItemWithChildren[];
}
