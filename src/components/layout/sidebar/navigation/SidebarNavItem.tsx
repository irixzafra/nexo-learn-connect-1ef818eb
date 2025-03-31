
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
              "flex h-10 w-10 items-center justify-center rounded-md relative",
              isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <Icon className="h-5 w-5" />
            {badge && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-500 text-[10px] font-medium text-white flex items-center justify-center">
                {badge > 99 ? '99+' : badge}
              </span>
            )}
          </NavLink>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 text-sm transition-colors rounded-md",
        isActive ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20" : "text-gray-700 hover:text-blue-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <Icon className="mr-3 h-5 w-5 text-blue-500" />
      <span>{label}</span>
      {badge && (
        <span className="ml-auto bg-blue-500 text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center text-white">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarNavItem;
