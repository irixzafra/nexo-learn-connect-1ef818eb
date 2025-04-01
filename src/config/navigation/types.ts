
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { MenuItem as BaseMenuItem } from '@/types/navigation';

// Extend the base MenuItem interface from navigation types
export interface MenuItem extends Omit<BaseMenuItem, 'icon'> {
  icon: LucideIcon; // Keep this strictly as LucideIcon for config usage
  label: string;
  path: string;
  requiredRole: UserRoleType | UserRoleType[];
  isHighlighted?: boolean;
  description?: string;
  disabled?: boolean;
  badge?: string | number;
}

export type NavigationGroup = {
  [key: string]: MenuItem[];
};

// Import the NavigationMenus type from its new location
export type { NavigationMenus } from '@/types/navigation';
