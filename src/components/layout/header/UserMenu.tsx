
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Sliders } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import RoleIndicator from './RoleIndicator';

export const UserMenu: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      const nameParts = profile.full_name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'UN';
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Sesión cerrada exitosamente");
    navigate('/auth/login');
  };

  return (
    <div className="flex items-center gap-2">
      {/* Role Indicator/Toggler Badge */}
      <RoleIndicator asToggler={true} />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Usuario"} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-3 p-3 border-b border-border">
            <Avatar className="h-10 w-10 bg-muted">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Usuario"} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 leading-none">
              <p className="font-medium text-sm">{profile?.full_name}</p>
              <p className="text-xs text-muted-foreground">
                {profile?.role === 'admin' ? 'Administrador' : profile?.role === 'instructor' ? 'Instructor' : 'Estudiante'}
              </p>
            </div>
          </div>
          
          <div className="py-2">
            <DropdownMenuItem asChild className="py-3 cursor-pointer">
              <Link to="/profile" className="flex w-full items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>Mi Perfil</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="py-3 cursor-pointer">
              <Link to="/preferences" className="flex w-full items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Sliders className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>Preferencias</span>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="py-3 cursor-pointer">
              <Link to="/settings" className="flex w-full items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Settings className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>Configuración</span>
              </Link>
            </DropdownMenuItem>
          </div>
          
          <DropdownMenuSeparator />
          
          <div className="py-2">
            <DropdownMenuItem 
              className="text-red-600 dark:text-red-400 cursor-pointer py-3"
              onClick={handleLogout}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 mr-3">
                <LogOut className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
