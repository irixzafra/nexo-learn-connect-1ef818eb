
import React, { useState } from 'react';
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
  Globe,
  Shield
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { NavLink } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demonstration - replace with actual unread message count from a hook
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default language is Spanish
  
  // State for role switching
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRole>(viewAsRole || 'current');
  
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
  
  // Determine the home path based on the user's role
  const getHomePath = () => {
    switch (effectiveRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'student':
      default:
        return '/home';
    }
  };

  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setCurrentViewRole(role);
    toast.success(`Vista cambiada a: ${getRoleName(role)}`);
  };

  // Get role display name
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'sistemas': return 'Sistemas';
      case 'anonimo': return 'Anónimo';
      default: return 'Usuario';
    }
  };
  
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
      icon: Settings,
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

  // Language options
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    // Here you would typically change the language in your app's state/context
    console.log(`Language changed to ${langCode}`);
  };
  
  // Available roles for switching view
  const availableRoles: UserRole[] = ['admin', 'instructor', 'student', 'sistemas', 'anonimo'];

  return (
    <div className="h-full flex flex-col py-4">
      {/* Logo at the top with full title and subtitle */}
      <div className={cn(
        "flex items-center justify-start",
        isCollapsed ? "px-2 mb-4" : "px-4 mb-6"
      )}>
        {isCollapsed ? (
          <NexoLogo variant="icon" className="h-8 w-auto mx-auto" />
        ) : (
          <NexoLogo className="h-8 w-auto" subtitle="ecosistema creativo" />
        )}
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
      </div>
      
      <div className="mt-auto pt-4 border-t px-4">
        {/* Role Switcher - Only shown for admins */}
        {userRole === 'admin' && (
          <div className="mb-3">
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Shield className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Cambiar vista de rol</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                    <Shield className="h-4 w-4" />
                    <span>{getRoleName(effectiveRole as UserRole)}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {availableRoles.map(role => (
                    <DropdownMenuItem 
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={cn(
                        "cursor-pointer",
                        currentViewRole === role && "font-bold bg-primary/10"
                      )}
                    >
                      {getRoleName(role)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
        
        {/* Language Switcher */}
        <div className="mb-3 flex justify-center">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Cambiar idioma</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                  <Globe className="h-4 w-4" />
                  <span>{languages.find(lang => lang.code === currentLanguage)?.name || 'Idioma'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {languages.map(lang => (
                  <DropdownMenuItem 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      currentLanguage === lang.code && "font-bold bg-primary/10"
                    )}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Nexo Academia © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
