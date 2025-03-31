
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { MenuItem } from './MenuItems';
import { Badge } from '@/components/ui/badge';

interface SidebarNavigationProps {
  items: {
    path: string;
    label: string;
    icon: LucideIcon;
    badge?: number;
    onClick?: () => void;
  }[];
  isCollapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ items, isCollapsed }) => {
  return (
    <nav className="space-y-1">
      {items.map((item, index) => (
        <MenuItem
          key={index}
          to={item.onClick ? undefined : item.path}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          isCollapsed={isCollapsed}
          onClick={item.onClick}
        />
      ))}
    </nav>
  );
};

export default SidebarNavigation;
