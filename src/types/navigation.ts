
import { UserRoleType } from '@/types/auth';
import { LucideIcon } from 'lucide-react';

// Base navigation item
export interface MenuItem {
  id?: string;
  path: string;
  label: string;
  icon?: string | LucideIcon;
  requiredRole?: UserRoleType | UserRoleType[];
  badge?: number;
  isHighlighted?: boolean;
  disabled?: boolean;
}

// Navigation with children
export interface NavigationMenus {
  [category: string]: MenuItem[];
}
