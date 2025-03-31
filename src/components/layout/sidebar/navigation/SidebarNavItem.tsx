
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SidebarNavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge,
  isCollapsed = false 
}) => {
  if (isCollapsed) {
    return (
      <li className="px-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink 
              to={to} 
              className={({ isActive }) => cn(
                "flex h-9 w-9 items-center justify-center rounded-md relative",
                "transition-colors duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border-l-2 border-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
              {badge !== undefined && badge > 0 && (
                <Badge variant="default" className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                  {badge}
                </Badge>
              )}
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </li>
    );
  }

  return (
    <li>
      <NavLink 
        to={to} 
        className={({ isActive }) => cn(
          "flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md",
          "transition-all duration-200",
          isActive 
            ? "bg-primary/10 text-primary border-l-2 border-primary pl-[calc(0.75rem-2px)]" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <span className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span className="text-sm font-medium">{label}</span>
        </span>
        {badge !== undefined && badge > 0 && (
          <Badge variant="default">
            {badge}
          </Badge>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarNavItem;
