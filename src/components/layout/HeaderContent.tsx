
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Bell, Settings, User, LogOut, Edit, CheckSquare } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';

interface HeaderContentProps {
  userRole: string | null;
  viewingAs: string | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ userRole, viewingAs }) => {
  const { user, profile, logout } = useAuth();
  const { isEditMode, toggleEditMode } = useEditMode();

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

  return (
    <div className="container mx-auto py-2 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        
        {viewingAs && (
          <div className="ml-4 px-3 py-1 bg-amber-50 text-amber-800 dark:bg-amber-800/30 dark:text-amber-500 text-xs font-medium rounded-full">
            Viendo como: <span className="capitalize font-semibold">{viewingAs}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Edit Mode Toggle en el header - solo visible para admins */}
        {userRole === 'admin' && (
          <Button
            variant={isEditMode ? "default" : "outline"}
            size="sm"
            onClick={toggleEditMode}
            className={cn(
              "gap-2",
              isEditMode ? 'bg-primary text-primary-foreground' : '',
              "sm:flex sm:items-center" // Para móvil
            )}
          >
            {isEditMode ? (
              <>
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Editando</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Editar</span>
              </>
            )}
          </Button>
        )}
        
        <Button variant="ghost" size="icon" asChild className="relative">
          <Link to="/messages">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
              2
            </span>
          </Link>
        </Button>
        
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
              <div className="flex flex-col space-y-1 leading-none">
                {profile?.full_name && (
                  <p className="font-medium">{profile.full_name}</p>
                )}
                <p className="text-sm text-muted-foreground capitalize">
                  {userRole || 'Usuario'}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
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
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderContent;
