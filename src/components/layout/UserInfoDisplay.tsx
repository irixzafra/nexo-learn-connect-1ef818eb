
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
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              {isViewingAsOtherRole && (
                <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  <ArrowLeftRight className="h-3 w-3" />
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover">
            <DropdownMenuLabel>{profile?.full_name || 'Usuario'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            
            {effectiveUserRole === 'instructor' && (
              <DropdownMenuItem onClick={() => navigate('/instructor/courses')} className="cursor-pointer">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Mis cursos</span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* Opción para volver al rol original - visible cuando se está viendo como otro rol */}
            {isViewingAsOtherRole && (
              <DropdownMenuItem 
                onClick={() => onRoleChange(effectiveUserRole)}
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary font-medium cursor-pointer"
              >
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                <span>Volver a mi rol</span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
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
