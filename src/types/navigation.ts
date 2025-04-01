
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from './auth';

export interface MenuItem {
  id?: string;
  label: string;
  icon?: ReactNode;
  url?: string;
  path?: string; // Added to support both naming conventions
  onClick?: () => void;
  items?: MenuItem[];
  badge?: string | number;
  roles?: string[];
  requiredRole?: UserRoleType | UserRoleType[]; // Added to match config navigation
  requiredFeature?: string;
  external?: boolean;
  active?: boolean;
  disabled?: boolean; // Added to support disabled property
  isHighlighted?: boolean; // Added to support highlighted menu items
  description?: string; // Added to support descriptions
}

// Define a new interface for NavigationMenus without circular dependencies
export interface NavigationMenus {
  main: MenuItem[];
  admin: MenuItem[];
  explore: MenuItem[];
  instructor: MenuItem[];
  academic: MenuItem[];
  finance: MenuItem[];
  settings: MenuItem[];
  gamification: MenuItem[];
}
