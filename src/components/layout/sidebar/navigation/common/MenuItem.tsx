
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  badge?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isCollapsed,
  badge
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center px-2 py-1.5 rounded-md text-sm
        ${isActive 
          ? 'bg-accent text-accent-foreground font-medium' 
          : 'text-foreground/80 hover:bg-accent/50 hover:text-accent-foreground transition-colors'}
      `}
    >
      {({ isActive }) => (
        <>
          <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'} shrink-0`} />
          {!isCollapsed && (
            <div className="ml-2 flex items-center">
              <span>{label}</span>
              {badge && badge}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
};
