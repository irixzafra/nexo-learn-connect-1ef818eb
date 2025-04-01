
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
  badge?: string | number;
  roles?: string[];
  requiredRole?: UserRoleType | UserRoleType[];
  requiredFeature?: string;
  external?: boolean;
  active?: boolean;
  disabled?: boolean;
  isHighlighted?: boolean;
  description?: string;
}

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
