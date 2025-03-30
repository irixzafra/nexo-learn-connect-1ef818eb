
import React from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { RoleSwitcher } from '@/components/admin/RoleSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User, ArrowLeftRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface SidebarFooterContentProps {
  viewAsRole: UserRoleType | 'current';
  onRoleChange: (role: UserRoleType) => void;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({
  viewAsRole,
  onRoleChange
}) => {
  const { user, profile, logout, userRole } = useAuth();
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
  
  const handleRoleChange = (newRole: UserRoleType) => {
    console.log("SidebarFooterContent: handleRoleChange called with role:", newRole);
    onRoleChange(newRole);
    toast.success(`Cambiando a rol: ${newRole}`);
  };

  // Verificar si estamos viendo como otro rol
  const effectiveUserRole = toUserRoleType(userRole as string);
  const isViewingAsOtherRole = viewAsRole !== 'current' && viewAsRole !== effectiveUserRole;
  
  return (
    <div className="flex flex-col gap-4">
      {/* Componente Role Switcher - Solo visible para admins */}
      {user && profile?.role === 'admin' && (
        <RoleSwitcher 
          currentViewRole={viewAsRole} 
          onChange={handleRoleChange} 
        />
      )}
      
      {/* Botón para volver al rol original - visible sólo cuando se está viendo como otro rol */}
      {isViewingAsOtherRole && (
        <Button
          variant="outline"
          className="w-full bg-red-100 text-red-600 border-red-200 hover:bg-red-200 hover:text-red-700 font-medium"
          onClick={() => onRoleChange(effectiveUserRole)}
        >
          <ArrowLeftRight className="mr-2 h-4 w-4" />
          <span>Volver a mi rol</span>
        </Button>
      )}
      
      {/* Info de Usuario */}
      <div className="flex items-center justify-between">
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
        
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/profile')}
                className="h-8 w-8"
                aria-label="Perfil de usuario"
              >
                <User className="h-4 w-4 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Perfil</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/settings')}
                className="h-8 w-8"
                aria-label="Configuración"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Configuración</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Cerrar sesión</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default SidebarFooterContent;
