
export interface MenuItem {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  url?: string;
  onClick?: () => void;
  items?: MenuItem[];
  badge?: string | number;
  roles?: string[];
  requiredFeature?: string;
  external?: boolean;
  active?: boolean;
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
