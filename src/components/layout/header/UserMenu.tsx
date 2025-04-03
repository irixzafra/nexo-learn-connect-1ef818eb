
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
import { User, LogOut, Settings, Sliders, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';
import RoleIndicator from './RoleIndicator';

export const UserMenu: React.FC = () => {
  const { user, profile, logout, isViewingAsOtherRole, resetToOriginalRole } = useAuth();
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
      {/* Role Indicator Badge */}
      <RoleIndicator />
      
      {/* Reset to original role button - only shown when viewing as other role */}
      {isViewingAsOtherRole && (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={resetToOriginalRole}
          className="hidden sm:flex items-center border-yellow-500 text-yellow-700"
        >
          <ShieldAlert className="mr-1 h-4 w-4" />
          Volver a mi rol
        </Button>
      )}
      
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
          <div className="flex items-center justify-start gap-2 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || "Usuario"} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 leading-none">
              {profile?.full_name && (
                <p className="font-medium text-sm">{profile.full_name}</p>
              )}
              <p className="text-xs text-muted-foreground capitalize">
                {profile?.role === 'admin' ? 'Administrador' : profile?.role === 'instructor' ? 'Instructor' : 'Estudiante'}
              </p>
            </div>
          </div>
          
          {/* Show reset role option in dropdown menu on mobile */}
          {isViewingAsOtherRole && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={resetToOriginalRole} className="sm:hidden text-yellow-700">
                <ShieldAlert className="mr-2 h-4 w-4" />
                <span>Volver a mi rol</span>
              </DropdownMenuItem>
            </>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex w-full items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/preferences" className="cursor-pointer flex w-full items-center">
              <Sliders className="mr-2 h-4 w-4" />
              <span>Preferencias</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex w-full items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="text-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
