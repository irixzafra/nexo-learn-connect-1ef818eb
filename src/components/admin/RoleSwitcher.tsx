
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeftRight, Shield, User, Terminal, Ghost, GraduationCap, BookOpen, Users, Lightbulb } from 'lucide-react';
import { RoleIndicator } from '@/components/layout/header/RoleIndicator';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RoleSwitcherProps {
  onChange?: (role: UserRoleType) => void;
  currentViewRole: UserRoleType | 'current';
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ 
  onChange,
  currentViewRole
}) => {
  const { userRole } = useAuth();
  
  // Solo los administradores pueden cambiar roles
  if (userRole !== 'admin') {
    return null;
  }

  const getEffectiveRole = () => {
    if (currentViewRole === 'current') return userRole as UserRoleType;
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const handleRoleChange = (role: UserRoleType | 'current') => {
    if (onChange) {
      if (role === 'current') {
        onChange(userRole as UserRoleType);
        toast.success(`Volviendo a tu rol original: ${getRoleLabel(userRole as UserRoleType)}`);
      } else {
        onChange(role);
        toast.success(`Cambiando vista a rol: ${getRoleLabel(role)}`);
      }
    }
  };

  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'profesor':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 text-blue-500" />;
      case 'moderator':
        return <Users className="h-4 w-4 text-purple-500" />;
      case 'content_creator':
        return <Lightbulb className="h-4 w-4 text-yellow-500" />;
      case 'anonimo':
      case 'guest':
        return <Ghost className="h-4 w-4" />;
      case 'student':
      default:
        return <GraduationCap className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getRoleLabel = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'profesor':
        return 'Profesor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'moderator':
        return 'Moderador';
      case 'content_creator':
        return 'Creador de Contenido';
      case 'guest':
        return 'Invitado';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  // Roles disponibles para vista previa
  const availableRoles: UserRoleType[] = ['admin', 'profesor', 'student', 'sistemas', 'moderator', 'content_creator', 'guest', 'anonimo'];
  
  const isViewingAsOtherRole = currentViewRole !== 'current' && currentViewRole !== userRole;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" />
              <span className="hidden md:inline">Vista como: {getRoleLabel(effectiveRole)}</span>
              <span className="inline md:hidden">Vista</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Vista previa como:
            </div>
            
            {availableRoles.map((role) => (
              <DropdownMenuItem 
                key={role}
                onSelect={() => handleRoleChange(role)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {getRoleIcon(role)}
                    <span>{getRoleLabel(role)}</span>
                  </div>
                  {currentViewRole === role && <Check className="h-4 w-4" />}
                </div>
              </DropdownMenuItem>
            ))}
            
            {isViewingAsOtherRole && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onSelect={() => handleRoleChange('current')}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  <span>Volver a mi rol ({getRoleLabel(userRole as UserRoleType)})</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Vista previa como otro rol</p>
      </TooltipContent>
    </Tooltip>
  );
};
