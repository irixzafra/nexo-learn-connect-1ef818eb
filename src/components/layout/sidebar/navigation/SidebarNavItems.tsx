
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart2, 
  CreditCard,
  Bookmark,
  Settings,
  MessageSquare,
  Bell
} from 'lucide-react';

interface SidebarNavItemsProps {
  role: UserRoleType;
  isCollapsed: boolean;
  notificationsCount?: number;
  messagesCount?: number;
}

const SidebarNavItems: React.FC<SidebarNavItemsProps> = ({ 
  role, 
  isCollapsed,
  notificationsCount = 0,
  messagesCount = 0
}) => {
  // Definir los items según el rol del usuario
  const getNavItems = () => {
    const commonItems = [
      { 
        icon: Home, 
        label: 'Panel Principal', 
        path: '/home',
        badge: 0
      },
      { 
        icon: BookOpen, 
        label: 'Mis Cursos', 
        path: '/courses',
        badge: 0
      },
      { 
        icon: Users, 
        label: 'Comunidad', 
        path: '/community',
        badge: 0
      },
      { 
        icon: Calendar, 
        label: 'Calendario', 
        path: '/calendar',
        badge: 0
      },
      { 
        icon: MessageSquare, 
        label: 'Mensajes', 
        path: '/messages',
        badge: messagesCount
      },
      { 
        icon: Bell, 
        label: 'Notificaciones', 
        path: '/notifications',
        badge: notificationsCount
      },
    ];
    
    const adminItems = [
      ...commonItems,
      { 
        icon: BarChart2, 
        label: 'Reportes', 
        path: '/reports',
        badge: 0
      },
      { 
        icon: CreditCard, 
        label: 'Finanzas', 
        path: '/finances',
        badge: 0
      },
      { 
        icon: Bookmark, 
        label: 'Elementos Guardados', 
        path: '/saved-items',
        badge: 0
      },
      { 
        icon: Settings, 
        label: 'Configuración', 
        path: '/settings',
        badge: 0
      },
    ];
    
    const instructorItems = [
      ...commonItems,
      { 
        icon: BarChart2, 
        label: 'Reportes', 
        path: '/reports',
        badge: 0
      },
      { 
        icon: Settings, 
        label: 'Configuración', 
        path: '/settings',
        badge: 0
      },
    ];
    
    const studentItems = [
      ...commonItems,
      { 
        icon: Bookmark, 
        label: 'Elementos Guardados', 
        path: '/saved-items',
        badge: 0
      },
      { 
        icon: Settings, 
        label: 'Configuración', 
        path: '/settings',
        badge: 0
      },
    ];
    
    switch (role) {
      case 'admin':
        return adminItems;
      case 'instructor':
        return instructorItems;
      case 'student':
      default:
        return studentItems;
    }
  };
  
  const navItems = getNavItems();
  
  if (isCollapsed) {
    return (
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.path}>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex h-10 w-10 items-center justify-center rounded-md relative",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                    {item.badge > 0 && (
                      <Badge variant="default" className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  }
  
  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild>
            <NavLink
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md w-full",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 min-w-5" />
              <span>{item.label}</span>
              {item.badge > 0 && (
                <Badge variant="default" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default SidebarNavItems;
