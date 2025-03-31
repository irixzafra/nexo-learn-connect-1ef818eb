
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, UserCog, ArrowLeftRight, Shield, User, Terminal, Ghost, UserRound, GraduationCap } from 'lucide-react';
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
    if (currentViewRole === 'current') return toUserRoleType(userRole as string);
    return currentViewRole;
  };

  const effectiveRole = getEffectiveRole();
  
  const handleRoleChange = (role: UserRoleType | 'current') => {
    if (onChange) {
      if (role === 'current') {
        onChange(toUserRoleType(userRole as string));
        toast.success(`Volviendo a tu rol original: ${getRoleLabel(toUserRoleType(userRole as string))}`);
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
      case 'instructor':
        return <UserCog className="h-4 w-4 text-amber-500" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 text-blue-500" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4" />;
      case 'student':
      default:
        return <User className="h-4 w-4 text-emerald-500" />;
    }
  };

  const getRoleLabel = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };

  // Roles disponibles para vista previa
  const availableRoles: UserRoleType[] = ['admin', 'instructor', 'student', 'sistemas', 'anonimo'];
  
  const isViewingAsOtherRole = currentViewRole !== 'current' && currentViewRole !== toUserRoleType(userRole as string);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
            >
              <GraduationCap className="h-5 w-5" />
              <span className="sr-only">Cambiar vista de rol</span>
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
                  <span>Volver a mi rol ({getRoleLabel(toUserRoleType(userRole as string))})</span>
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
