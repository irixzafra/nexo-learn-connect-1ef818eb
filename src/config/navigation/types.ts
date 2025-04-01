
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  requiredRole: UserRoleType | UserRoleType[];
  isHighlighted?: boolean;
  description?: string;
  disabled?: boolean;
}

export type NavigationGroup = {
  [key: string]: MenuItem[];
};

// Use 'export type' for re-exporting types when isolatedModules is enabled
export type { NavigationMenus } from '@/types/navigation';
