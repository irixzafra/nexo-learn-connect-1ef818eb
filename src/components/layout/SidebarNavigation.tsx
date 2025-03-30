
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/useNotifications';
import { NexoLogo } from '@/components/ui/logo';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  Settings, 
  User, 
  Phone,
  Bell,
  BookOpen,
  Award,
  Activity
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { NavLink } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  
  // Determine the effective role
  const getEffectiveRole = (): UserRole => {
    if (!viewAsRole || viewAsRole === 'current') {
      return userRole as UserRole;
    }
    return viewAsRole as UserRole;
  };
  
  const effectiveRole = getEffectiveRole();
  
  // Check if a role should see specific sections
  const canSeeAdmin = effectiveRole === 'admin' || effectiveRole === 'instructor';
  
  // Navegación simplificada - categorías principales
  const navigationItems = [
    {
      name: "Inicio",
      icon: Home,
      path: "/home",
      tooltip: "Accesos rápidos a cursos y progreso",
      submenu: [
        { name: "Mis Cursos", icon: BookOpen, path: "/my-courses" },
        { name: "Certificados", icon: Award, path: "/certificates" },
        { name: "Mi Progreso", icon: Activity, path: "/progress" }
      ]
    },
    {
      name: "Explorar",
      icon: Compass,
      path: "/courses",
      tooltip: "Descubrir cursos y rutas de aprendizaje",
      submenu: [
        { name: "Cursos", icon: BookOpen, path: "/courses" },
        { name: "Rutas de Aprendizaje", icon: Activity, path: "/learning-paths" }
      ]
    },
    {
      name: "Comunidad",
      icon: Users,
      path: "/community",
      tooltip: "Feed, mensajes y contactos",
      submenu: [
        { name: "Feed", icon: Users, path: "/community" },
        { name: "Mensajes", icon: MessageSquare, path: "/messages" },
        { name: "Contactos", icon: Users, path: "/network" },
        { name: "Grupos", icon: Users, path: "/groups" }
      ]
    },
    {
      name: "Mensajes",
      icon: MessageSquare,
      path: "/messages",
      tooltip: "Centro de mensajes",
      badge: messagesCount
    },
    ...(canSeeAdmin ? [{
      name: "Administración",
      icon: Settings,
      path: "/admin/dashboard",
      tooltip: "Panel de administración"
    }] : []),
    {
      name: "Perfil",
      icon: User,
      path: "/profile",
      tooltip: "Mi perfil y configuraciones",
      badge: notificationsCount
    },
    {
      name: "Contacto",
      icon: Phone,
      path: "/contact",
      tooltip: "WhatsApp y asistente de voz"
    }
  ];

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top */}
      <div className="flex items-center justify-center py-4">
        <NexoLogo variant="icon" className="h-8 w-auto" />
      </div>
      
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
                <div>
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
                  
                  {/* Submenu items when not collapsed */}
                  {item.submenu && (
                    <div className="pl-10 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-md text-sm",
                            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
                          )}
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.name}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto pt-4 border-t px-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Nexo Academia © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
