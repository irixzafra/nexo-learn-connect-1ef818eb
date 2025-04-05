
import { LucideIcon } from 'lucide-react';
import { UserRoleType } from './auth';

export interface NavigationItemBase {
  id: string;
  label: string;
  iconName?: string; // Nombre del icono de Lucide
  sortOrder: number;
  isActive: boolean;
  isVisible: boolean;
  path?: string; // Solo para items tipo "link"
  itemType: 'link' | 'group' | 'separator'; 
  parentId?: string | null; // null para items de primer nivel
  visibleToRoles?: UserRoleType[]; // Roles que pueden ver este elemento
}

export interface NavigationItemWithChildren extends NavigationItemBase {
  children?: NavigationItemWithChildren[];
}

export interface NavigationGrouping {
  id: string;
  name: string;
  description?: string;
  items: NavigationItemWithChildren[];
}

export interface RoleNavigation {
  role: UserRoleType;
  structure: NavigationGrouping[];
}

export interface NavigationUpdate {
  itemId: string;
  changes: Partial<NavigationItemBase>;
}

export interface NavigationState {
  items: NavigationItemWithChildren[];
  selectedItem: string | null;
}
