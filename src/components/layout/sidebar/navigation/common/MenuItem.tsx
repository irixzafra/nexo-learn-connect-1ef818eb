
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
  isHighlighted?: boolean;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  to,
  icon: Icon,
  label,
  badge,
  isCollapsed = false,
  isHighlighted = false,
  disabled = false
}) => {
  return (
    <NavLink
      to={disabled ? '#' : to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted/50",
          isHighlighted && "ring-2 ring-primary/30",
          disabled && "opacity-60 pointer-events-none"
        )
      }
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      {Icon && (
        <Icon className="h-4 w-4" />
      )}
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {badge !== undefined && badge > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {badge}
            </Badge>
          )}
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;
