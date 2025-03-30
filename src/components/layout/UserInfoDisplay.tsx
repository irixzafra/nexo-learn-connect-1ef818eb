
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, BookOpen, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface UserInfoDisplayProps {
  viewAsRole: UserRoleType | 'current';
  onRoleChange: (role: UserRoleType) => void;
}

const UserInfoDisplay: React.FC<UserInfoDisplayProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { user, profile, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const effectiveUserRole = toUserRoleType(userRole as string);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Verifica si estamos viendo como otro rol
  const isViewingAsOtherRole = viewAsRole !== 'current' && viewAsRole !== effectiveUserRole;

  return user ? (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{profile?.full_name || 'Usuario'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            
            {effectiveUserRole === 'instructor' && (
              <DropdownMenuItem onClick={() => navigate('/instructor/courses')}>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Mis cursos</span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
            
            {/* Opción para volver al rol original - visible para todos cuando se está viendo como otro rol */}
            {isViewingAsOtherRole && (
              <DropdownMenuItem onClick={() => onRoleChange(effectiveUserRole)}>
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                <span>Volver a mi rol</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Mi perfil</p>
      </TooltipContent>
    </Tooltip>
  ) : null;
};

export default UserInfoDisplay;
