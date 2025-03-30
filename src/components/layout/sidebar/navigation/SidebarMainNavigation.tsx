
import React from 'react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  Settings, 
  User, 
  Phone,
  Search,
  Shield
} from 'lucide-react';

interface SidebarMainNavigationProps {
  effectiveRole: UserRole;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  // Check if a role should see specific sections
  const canSeeAdmin = effectiveRole === 'admin' || effectiveRole === 'instructor';

  // Navegación simplificada - solo categorías principales
  const navigationItems = [
    {
      name: "Inicio",
      icon: Home,
      path: getHomePath(),
      tooltip: "Inicio"
    },
    {
      name: "Explorar",
      icon: Compass,
      path: "/courses",
      tooltip: "Explorar cursos"
    },
    {
      name: "Comunidad",
      icon: Users,
      path: "/community",
      tooltip: "Comunidad"
    },
    {
      name: "Mensajes",
      icon: MessageSquare,
      path: "/messages",
      tooltip: "Mensajes",
      badge: messagesCount
    },
    ...(canSeeAdmin ? [{
      name: "Administración",
      icon: Shield,
      path: "/admin/dashboard",
      tooltip: "Administración"
    }] : []),
    {
      name: "Perfil",
      icon: User,
      path: "/profile",
      tooltip: "Mi perfil",
      badge: notificationsCount
    },
    {
      name: "Contacto",
      icon: Phone,
      path: "/contact",
      tooltip: "Contacto"
    }
  ];

  return (
    <div className={cn(
      "flex-1 overflow-auto",
      isCollapsed ? "px-2" : "px-4"
    )}>
      <nav className="space-y-2 pt-4">
        {navigationItems.map((item) => (
          <div key={item.name} className="mb-1">
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex h-10 w-10 items-center justify-center rounded-md transition-colors relative",
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.badge && item.badge > 0 && (
                      <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-h-5 min-w-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.tooltip || item.name}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center justify-between gap-3 w-full px-3 py-2 rounded-md text-sm font-medium",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive">
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Search button for collapsed sidebar - only for admins */}
      {effectiveRole === 'admin' && isCollapsed && (
        <div className="px-2 mb-4 flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => window.location.href = '/admin/users'}
              >
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Buscar usuarios</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default SidebarMainNavigation;
