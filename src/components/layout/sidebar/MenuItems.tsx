
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
  badge?: string | number;
  disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  disabled = false 
}) => {
  const location = useLocation();
  
  // Verificar si una ruta está activa (actual o sus subrutas)
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
            "flex items-center justify-between gap-2 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 font-medium text-[15px] font-inter transition-all duration-200",
            isActive ? 
              "bg-[#E5E7EB] text-gray-900 dark:bg-gray-700 dark:text-white border-l-[3px] border-l-[#0E90F9] pl-[calc(0.75rem-3px)]" : 
              "hover:bg-[#F3F4F6] dark:hover:bg-gray-800",
            disabled && "opacity-60 cursor-not-allowed text-[#9CA3AF] dark:text-gray-500 hover:bg-transparent dark:hover:bg-transparent",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
                "size-5 flex-shrink-0", 
                isActive ? 
                  "text-gray-900 dark:text-white" : 
                  "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
                disabled && "text-[#9CA3AF] dark:text-gray-500"
              )} 
              aria-hidden="true" 
            />
            <span>{label}</span>
          </span>
          {badge && (
            <Badge variant={typeof badge === 'number' && badge > 0 ? "default" : "secondary"} className="ml-auto text-xs">
              {badge}
            </Badge>
          )}
          {disabled && (
            <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
              Próximamente
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
