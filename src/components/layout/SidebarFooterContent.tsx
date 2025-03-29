
import React, { useState } from 'react';
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
import { LogOut, User, Settings, BookOpen, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import RoleSwitcher from '@/components/admin/RoleSwitcher';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserRoleSearch } from '@/components/admin/UserRoleSearch';
import { Badge } from '@/components/ui/badge';

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
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

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

  const getRoleBadgeVariant = (role?: UserRole) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'instructor':
        return 'secondary';
      case 'student':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const isViewingAsOtherRole = viewAsRole !== 'current' && viewAsRole !== userRole;

  return (
    <div className="flex flex-col gap-3">
      {/* Role switcher for admins */}
      {userRole === 'admin' && (
        <div className="px-2 mb-2">
          <RoleSwitcher 
            currentViewRole={viewAsRole} 
            onChange={onRoleChange}
          />
        </div>
      )}
      
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 w-full justify-start px-2 hover:bg-muted">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {profile?.full_name || 'Usuario'}
                  </span>
                  {isViewingAsOtherRole && (
                    <Badge variant="outline" className="h-5 text-xs">Vista previa</Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={getRoleBadgeVariant(userRole || undefined)} className="h-5 text-xs capitalize">
                    {userRole || 'Usuario'}
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
            
            {userRole === 'admin' && (
              <DropdownMenuItem onClick={() => setIsSearchDialogOpen(true)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Buscar usuarios</span>
              </DropdownMenuItem>
            )}
            
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

      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buscar usuarios</DialogTitle>
          </DialogHeader>
          <UserRoleSearch onClose={() => setIsSearchDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SidebarFooterContent;
