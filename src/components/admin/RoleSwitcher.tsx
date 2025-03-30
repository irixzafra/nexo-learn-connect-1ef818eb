
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
import { Check, UserCog, ArrowLeftRight, Shield, User, Terminal, Ghost, Users, BookOpen, Book } from 'lucide-react';
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
    console.log("RoleSwitcher: handleRoleChange called with role:", role);
    
    if (onChange) {
      if (role === 'current') {
        const actualRole = toUserRoleType(userRole as string);
        onChange(actualRole);
        toast.success(`Volviendo a tu rol actual: ${actualRole}`);
      } else {
        onChange(role);
        toast.success(`Viendo como: ${role}`);
      }
    }
  };

  // Icono para cada rol
  const getRoleIcon = (role: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 mr-2" />;
      case 'instructor':
        return <BookOpen className="h-4 w-4 mr-2" />;
      case 'student':
        return <Book className="h-4 w-4 mr-2" />;
      case 'moderator':
        return <Users className="h-4 w-4 mr-2" />;
      case 'content_creator':
        return <UserCog className="h-4 w-4 mr-2" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4 mr-2" />;
      case 'guest':
        return <Ghost className="h-4 w-4 mr-2" />;
      default:
        return <User className="h-4 w-4 mr-2" />;
    }
  };

  // Nombre legible para cada rol
  const getRoleName = (role: UserRoleType) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'moderator': return 'Moderador';
      case 'content_creator': return 'Creador de contenido';
      case 'sistemas': return 'Sistemas';
      case 'guest': return 'Invitado';
      case 'beta_tester': return 'Beta Tester';
      case 'anonimo': return 'Anónimo';
      default: return role;
    }
  };

  return (
    <div className="px-3 mb-2">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-left font-normal"
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                <span className="flex-1">Ver como: {getRoleName(effectiveRole)}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cambiar perspectiva de visualización</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem 
            onClick={() => handleRoleChange('current')}
            className="flex items-center"
          >
            {currentViewRole === 'current' && <Check className="h-4 w-4 mr-2" />}
            <span className="ml-6">Tu rol actual</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          {/* Lista de roles disponibles */}
          <DropdownMenuItem onClick={() => handleRoleChange('admin')}>
            {effectiveRole === 'admin' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('admin')}
              <span>Administrador</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('instructor')}>
            {effectiveRole === 'instructor' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('instructor')}
              <span>Instructor</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('student')}>
            {effectiveRole === 'student' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('student')}
              <span>Estudiante</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('moderator')}>
            {effectiveRole === 'moderator' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('moderator')}
              <span>Moderador</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('content_creator')}>
            {effectiveRole === 'content_creator' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('content_creator')}
              <span>Creador de contenido</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('guest')}>
            {effectiveRole === 'guest' && <Check className="h-4 w-4 mr-2" />}
            <div className="flex items-center ml-2">
              {getRoleIcon('guest')}
              <span>Invitado</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
