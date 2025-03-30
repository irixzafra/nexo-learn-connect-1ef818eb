
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
  badge?: string;
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
            "flex items-center justify-between gap-2 px-2 py-2 rounded-md",
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-accent/20",
            disabled && "opacity-50 cursor-not-allowed",
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
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>{label}</span>
          </span>
          {badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
