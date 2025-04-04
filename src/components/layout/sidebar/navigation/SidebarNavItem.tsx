
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
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink 
            to={disabled ? '#' : href}
            className={({ isActive }) => cn(
              "flex h-10 w-10 items-center justify-center rounded-md relative transition-all duration-200",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              isHighlighted && "ring-2 ring-primary/30",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            )}
            onClick={(e) => {
              if (disabled) e.preventDefault();
            }}
          >
            {Icon && <Icon className="h-5 w-5" />}
            {badge !== undefined && badge > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right" className="py-1.5 px-3 shadow-md">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={disabled ? '#' : href}
      className={({ isActive }) => cn(
        "flex items-center py-2.5 px-3 text-sm transition-colors rounded-md group gap-3",
        isActive 
          ? "bg-primary/10 text-primary border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        isHighlighted && "ring-2 ring-primary/20 bg-primary/5",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className="font-medium">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge variant="outline" className="ml-auto px-1.5 min-w-5 text-center">
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
