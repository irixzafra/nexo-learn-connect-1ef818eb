
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  disabled?: boolean;
  isCollapsed?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  disabled = false,
  isCollapsed = false
}) => {
  const location = useLocation();
  
  // Check if a route is active (current or its subroutes)
  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isActive = isRouteActive(to);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild disabled={disabled}>
        <Link 
          to={disabled ? "#" : to} 
          className={cn(
            "flex items-center justify-between gap-2 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 font-medium text-sm transition-all duration-200",
            isActive ? 
              "bg-gray-100 text-primary dark:bg-gray-800 dark:text-primary border-l-2 border-l-primary pl-[calc(0.75rem-2px)]" : 
              "hover:bg-gray-50 dark:hover:bg-gray-900/50",
            disabled && "opacity-60 cursor-not-allowed text-[#9CA3AF] dark:text-gray-500 hover:bg-transparent dark:hover:bg-transparent",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          )}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              toast.info("Esta funcionalidad estará disponible próximamente");
            }
          }}
          aria-current={isActive ? "page" : undefined}
          aria-disabled={disabled}
          role="menuitem"
          tabIndex={disabled ? -1 : 0}
        >
          <span className="flex items-center gap-3">
            <Icon 
              className={cn(
                "h-[18px] w-[18px] flex-shrink-0", 
                isActive ? 
                  "text-primary dark:text-primary" : 
                  "text-gray-500 dark:text-gray-400",
                disabled && "text-[#9CA3AF] dark:text-gray-500"
              )} 
              aria-hidden="true" 
            />
            {!isCollapsed && <span className="text-sm">{label}</span>}
          </span>
          {!isCollapsed && badge !== undefined && badge > 0 && (
            <Badge variant="default" className="ml-auto py-0 h-5 min-w-[20px] text-xs">
              {badge}
            </Badge>
          )}
          {isCollapsed && badge !== undefined && badge > 0 && (
            <Badge variant="default" className="absolute -top-1 -right-1 px-1 py-0 min-w-[18px] h-[18px] text-[10px]">
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
