
import { MenuItem } from './navigation';
import { UserRoleType } from './auth';
import { LucideIcon } from 'lucide-react';

export interface NavigationItemWithChildren {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon | string;
  sortOrder?: number;
  isActive?: boolean;
  isVisible?: boolean;
  itemType?: 'link' | 'section' | 'divider';
  requiredRole?: UserRoleType | UserRoleType[];
  badge?: number;
  isHighlighted?: boolean;
  disabled?: boolean;
  children?: NavigationItemWithChildren[];
}

export interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItemWithChildren[];
  isCollapsed?: boolean;
  requiredRole?: UserRoleType | UserRoleType[];
}

export interface NavigationState {
  items: NavigationItemWithChildren[];
  sections: NavigationSection[];
}
