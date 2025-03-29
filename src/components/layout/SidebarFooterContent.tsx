
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
import { LogOut, User, Settings, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

// This component is used in the AppSidebar
type ViewAsRole = UserRole | 'current';

interface SidebarFooterContentProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({ 
  viewAsRole,
  onRoleChange 
}) => {
  const { user, profile, userRole, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="flex items-center justify-between">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 w-full justify-start px-2 hover:bg-muted">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {profile?.full_name || 'Usuario'}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {userRole || 'Usuario'}
                </span>
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
            
            {userRole === 'instructor' && (
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
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col w-full gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/auth/login')}
          >
            Iniciar sesión
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => navigate('/auth/register')}
          >
            Registrarse
          </Button>
        </div>
      )}
    </div>
  );
};

export default SidebarFooterContent;
