
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

interface SidebarNavItemProps {
  href: string;
  icon?: LucideIcon;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
  disabled?: boolean;
  isHighlighted?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  href, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed = false,
  disabled = false,
  isHighlighted = false
}) => {
  // For collapsed sidebar with tooltips
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink 
            to={disabled ? '#' : href}
            className={({ isActive }) => cn(
              "flex h-8 w-8 items-center justify-center rounded-md relative transition-all duration-200",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              isHighlighted && "ring-2 ring-primary/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            )}
            onClick={(e) => {
              if (disabled) e.preventDefault();
            }}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {badge !== undefined && badge > 0 && (
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="py-1 px-2 shadow-md">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Expanded sidebar view
  return (
    <NavLink
      to={disabled ? '#' : href}
      className={({ isActive }) => cn(
        "flex items-center py-1.5 px-3 text-sm rounded-md group gap-3 transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        isHighlighted && "ring-1 ring-primary/20 bg-primary/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span className="font-medium text-sm">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge variant="outline" className="ml-auto px-1 min-w-4 text-center text-xs">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
      {disabled && (
        <span className="ml-auto text-xs bg-muted/60 text-muted-foreground px-1.5 py-0.5 rounded">
          Próximamente
        </span>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;
