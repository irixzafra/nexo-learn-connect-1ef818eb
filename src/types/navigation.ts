
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

export type { NavigationMenus } from "@/config/navigation";
