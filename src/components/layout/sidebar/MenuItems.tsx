
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
            "flex items-center justify-between gap-2 px-3 py-2 rounded-md text-gray-500 dark:text-gray-400 font-medium text-[15px] transition-all duration-200",
            isActive ? 
              "bg-primary/10 text-primary border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]" : 
              "hover:bg-muted/40 hover:text-foreground",
            disabled && "opacity-60 cursor-not-allowed hover:bg-transparent",
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
                "h-5 w-5 flex-shrink-0", 
                isActive ? 
                  "text-primary" : 
                  "text-muted-foreground group-hover:text-foreground",
                disabled && "text-muted-foreground/60"
              )} 
              aria-hidden="true" 
            />
            {!isCollapsed && <span>{label}</span>}
          </span>
          {!isCollapsed && badge && (
            <Badge variant={typeof badge === 'number' && badge > 0 ? "default" : "secondary"} className="ml-auto text-xs">
              {badge}
            </Badge>
          )}
          {!isCollapsed && disabled && (
            <span className="ml-auto text-xs bg-muted/30 text-muted-foreground px-1.5 py-0.5 rounded">
              Próximamente
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
