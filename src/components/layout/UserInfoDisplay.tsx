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
import { LogOut, User, Settings, BookOpen, ArrowLeftRight, UserCog, Shield, Terminal, Ghost } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { Badge } from '@/components/ui/badge';

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

  const getRoleBadgeVariant = (role?: UserRoleType) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'instructor':
        return 'secondary';
      case 'sistemas':
        return 'destructive';
      case 'anonimo':
        return 'outline';
      case 'student':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleIcon = (role?: UserRoleType) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'instructor':
        return <UserCog className="h-4 w-4" />;
      case 'sistemas':
        return <Terminal className="h-4 w-4" />;
      case 'anonimo':
        return <Ghost className="h-4 w-4" />;
      case 'student':
        return <User className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const isViewingAsOtherRole = viewAsRole !== 'current' && viewAsRole !== effectiveUserRole;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 w-full justify-start px-2 hover:bg-muted">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-left overflow-hidden">
            <span className="text-sm font-medium truncate max-w-[120px]">
              {profile?.full_name || 'Usuario'}
            </span>
            <div className="flex items-center gap-1">
              <Badge 
                variant={getRoleBadgeVariant(toUserRoleType(userRole || ''))} 
                className="h-5 text-xs px-2 py-0 truncate max-w-[120px]"
              >
                <div className="flex items-center gap-1">
                  {getRoleIcon(toUserRoleType(userRole || ''))}
                  <span className="capitalize truncate">
                    {toUserRoleType(userRole || '')}
                  </span>
                </div>
              </Badge>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
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
        
        {isViewingAsOtherRole && effectiveUserRole === 'admin' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onRoleChange(toUserRoleType(userRole as string))}>
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              <span>Volver a mi rol</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default UserInfoDisplay;
