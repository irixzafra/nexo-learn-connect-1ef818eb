
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from './auth';

export interface MenuItem {
  id?: string;
  label: string;
  icon?: ReactNode | LucideIcon;
  url?: string;
  path?: string;
  onClick?: () => void;
  items?: MenuItem[];
  submenu?: MenuItem[];
  badge?: string | number;
  roles?: string[];
  requiredRole?: UserRoleType | UserRoleType[];
  requiredFeature?: string;
  external?: boolean;
  active?: boolean;
  disabled?: boolean;
  isHighlighted?: boolean;
  description?: string;
  domain?: string; // For admin domain-based navigation
  workflow?: string; // For instructor workflow-based navigation
}

export interface NavigationMenus {
  dashboard: MenuItem[];
  main: MenuItem[];
  admin: MenuItem[];
  instructor: MenuItem[];
  student: MenuItem[];
  learning: MenuItem[];
  community: MenuItem[];
  configuration: MenuItem[];
}
