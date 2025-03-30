
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Briefcase, 
  Megaphone, 
  Newspaper, 
  Settings
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComunidadNavigationProps {
  isCollapsed: boolean;
  messagesCount?: number;
  notificationsCount?: number;
}

export const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({
  isCollapsed,
  messagesCount = 0,
  notificationsCount = 0
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const routes = [
    {
      href: '/comunidad/foros',
      label: 'Foros',
      icon: Newspaper,
      active: isActive('/comunidad/foros'),
    },
    {
      href: '/comunidad/grupos',
      label: 'Grupos',
      icon: Users,
      active: isActive('/comunidad/grupos'),
    },
    {
      href: '/comunidad/mensajes',
      label: 'Mensajes',
      icon: MessageSquare,
      active: isActive('/comunidad/mensajes'),
      badge: messagesCount,
    },
    {
      href: '/comunidad/eventos',
      label: 'Eventos',
      icon: Calendar,
      active: isActive('/comunidad/eventos'),
    },
    {
      href: '/comunidad/empleos',
      label: 'Empleos',
      icon: Briefcase,
      active: isActive('/comunidad/empleos'),
    },
    {
      href: '/comunidad/anuncios',
      label: 'Anuncios',
      icon: Megaphone,
      active: isActive('/comunidad/anuncios'),
      badge: notificationsCount,
    },
  ];
  
  return (
    <div className="space-y-1 py-2">
      {routes.map((route) => (
        <Link
          key={route.href}
          to={route.href}
          className={cn(
            "flex items-center py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            route.active 
              ? "bg-gray-100 dark:bg-gray-800 text-primary" 
              : "text-muted-foreground"
          )}
        >
          <route.icon className={cn("h-4 w-4 mr-3", route.active && "text-primary")} />
          {!isCollapsed && (
            <span>{route.label}</span>
          )}
          {route.badge !== undefined && route.badge > 0 && (
            <Badge 
              variant="default" 
              className={cn(
                "ml-auto rounded-full px-1.5 h-5 min-w-5", 
                isCollapsed && "ml-0"
              )}
            >
              {route.badge}
            </Badge>
          )}
        </Link>
      ))}
    </div>
  );
};

export default ComunidadNavigation;
