
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  isCollapsed: boolean;
  disabled?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed,
  disabled = false
}) => {
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink 
            to={to}
            className={({ isActive }) => cn(
              "flex h-10 w-10 items-center justify-center rounded-full relative transition-all duration-200",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            )}
          >
            <Icon className="h-5 w-5" />
            {badge && badge > 0 && (
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
      to={to}
      className={({ isActive }) => cn(
        "flex items-center py-2.5 px-3 text-sm transition-colors rounded-md group gap-3",
        isActive 
          ? "bg-primary/10 text-primary border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
      )}
    >
      <Icon className={cn("h-5 w-5", ({ isActive }: {isActive: boolean}) => isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
      <span className="font-medium">{label}</span>
      {badge && badge > 0 && (
        <span className="ml-auto bg-primary text-xs rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center text-primary-foreground">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;
