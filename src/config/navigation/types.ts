
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from '@/types/auth';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  requiredRole: UserRoleType | UserRoleType[];
  isHighlighted?: boolean;
}

export type NavigationGroup = {
  [key: string]: MenuItem[];
};
