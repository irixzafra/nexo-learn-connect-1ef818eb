
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { useNotifications } from '@/hooks/useNotifications';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { AnimatedSidebarLogo } from '@/components/ui/logo/AnimatedSidebarLogo';
import SidebarNavItems from './sidebar/navigation/SidebarNavItems';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Globe, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SidebarNavigationProps {
  viewAsRole?: UserRoleType | 'current';
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  viewAsRole = 'current'
}) => {
  const { user, profile, userRole, logout, setViewAsRole } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Fixed value for demo - implement real logic later
  const navigate = useNavigate();
  
  // Formato para iniciales del avatar
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const effectiveRole = viewAsRole === 'current' 
    ? toUserRoleType(userRole as string) 
    : viewAsRole as UserRoleType;
  
  const handleRoleChange = (role: UserRoleType) => {
    setViewAsRole(role);
    toast.success(`Visualizando como: ${role}`);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
      toast.success("Sesión cerrada exitosamente");
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
      toast.error("Error al cerrar sesión");
    }
  };
  
  const handleThemeToggle = () => {
    // Implementar cambio de tema
    toast.info("Cambiando tema (funcionalidad pendiente)");
  };
  
  const handleLanguageChange = () => {
    // Implementar cambio de idioma
    toast.info("Cambiando idioma (funcionalidad pendiente)");
  };
  
  return (
    <div className="flex flex-col h-full py-2">
      {/* Logo Section */}
      <div className={cn(
        "flex items-center px-3 py-2",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {isCollapsed ? (
          <AnimatedSidebarLogo isCollapsed={true} />
        ) : (
          <>
            <div className="flex items-center gap-3">
              <AnimatedSidebarLogo />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg leading-none">nexo</h1>
                <p className="text-xs text-muted-foreground">ecosistema creativo</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Role indicator */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded text-center">
            {getRoleName(effectiveRole)}
          </div>
        </div>
      )}
      
      <SidebarSeparator className="my-2" />
      
      {/* Main Navigation Items */}
      <div className="flex-1 overflow-y-auto px-2">
        <SidebarNavItems 
          role={effectiveRole}
          isCollapsed={isCollapsed}
          notificationsCount={notificationsCount}
          messagesCount={messagesCount}
        />
      </div>
      
      <SidebarSeparator className="my-2" />
      
      {/* Footer Controls */}
      <div className="px-3 pt-2">
        {/* Role Switcher - Only for admins */}
        {profile?.role === 'admin' && (
          <div className="mb-3">
            <RoleSwitcher 
              currentViewRole={viewAsRole} 
              onChange={handleRoleChange} 
            />
          </div>
        )}
        
        {/* Theme & Language Controls */}
        <div className={cn(
          "flex mb-3", 
          isCollapsed ? "justify-center space-y-2 flex-col" : "justify-between"
        )}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="h-8 w-8">
                <Sun className="h-4 w-4" />
                <span className="sr-only">Cambiar tema</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Cambiar tema</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleLanguageChange} className="h-8 w-8">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Cambiar idioma</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Cambiar idioma</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/settings')}
                className="h-8 w-8"
              >
                <Settings className="h-4 w-4" />
                <span className="sr-only">Configuración</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={isCollapsed ? "right" : "top"}>
              <p>Configuración</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        {/* User Profile */}
        <div className={cn(
          isCollapsed ? "flex justify-center" : "flex items-center justify-between"
        )}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                        <AvatarImage src={profile?.avatar_url || undefined} />
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Mi Perfil</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                  <AvatarImage src={profile?.avatar_url || undefined} />
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {profile?.full_name || user?.email?.split('@')[0] || 'Usuario'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {profile?.role || 'Estudiante'}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper para obtener el nombre del rol
const getRoleName = (role: UserRoleType): string => {
  switch (role) {
    case 'admin': return 'Administrador';
    case 'instructor': return 'Instructor';
    case 'student': return 'Estudiante';
    case 'moderator': return 'Moderador';
    case 'content_creator': return 'Creador de contenido';
    case 'sistemas': return 'Sistemas';
    case 'guest': return 'Invitado';
    case 'anonimo': return 'Anónimo';
    default: return role;
  }
};

// Helper para combinar clases
const cn = (...classes: (string | undefined | null | false | 0)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default SidebarNavigation;
