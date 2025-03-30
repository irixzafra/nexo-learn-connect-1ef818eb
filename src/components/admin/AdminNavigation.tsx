
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Database,
  Settings,
  Bell,
  Route
} from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Main navigation categories
const adminCategories = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/admin/dashboard"
  },
  { 
    id: 'users',
    icon: Users, 
    label: "Usuarios", 
    path: "/admin/users",
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/finanzas",
  },
  { 
    id: 'learning',
    icon: Route, 
    label: "Rutas", 
    path: "/admin/learning-paths",
  },
  { 
    id: 'notifications',
    icon: Bell, 
    label: "Notificaciones", 
    path: "/admin/notifications",
  },
  { 
    id: 'data',
    icon: Database, 
    label: "Datos", 
    path: "/admin/test-data",
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
  }
];

const AdminNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="w-full py-4">
      <div className="container mx-auto">
        {/* Logo o título al inicio */}
        <div className="mb-6 px-2 flex justify-center">
          {isCollapsed ? (
            <LayoutDashboard className="h-6 w-6 text-primary" />
          ) : (
            <h3 className="text-lg font-semibold">Admin Panel</h3>
          )}
        </div>
        
        {/* Menú de navegación principal */}
        <SidebarMenu>
          {adminCategories.map((item) => (
            <SidebarMenuItem key={item.path}>
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild className={cn(
                      "w-10 h-10 flex justify-center",
                      path.includes(item.id) ? "bg-secondary" : ""
                    )}>
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <SidebarMenuButton asChild className={cn(
                  "flex items-center gap-3 px-3 py-2 w-full",
                  "hover:bg-accent rounded-md transition-colors",
                  path.includes(item.id) ? "bg-secondary" : ""
                )}>
                  <Link to={item.path} className="flex items-center gap-3 w-full">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </div>
  );
};

export default AdminNavigation;
