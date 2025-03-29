
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, LayoutDashboard, BookOpen } from 'lucide-react';

const LandingNav: React.FC = () => {
  const { user, profile, userRole, logout } = useAuth();

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-10 w-full">
      <Link to="/" className="flex items-center space-x-2">
        <NexoLogo />
      </Link>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/courses" className="text-base font-medium hover:text-primary transition-colors">
            Cursos
          </Link>
          <Link to="#pricing" className="text-base font-medium hover:text-primary transition-colors">
            Precios
          </Link>
          <Link to="#about" className="text-base font-medium hover:text-primary transition-colors">
            Nosotros
          </Link>
        </div>
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || 'User'} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{profile?.full_name || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole || 'Usuario'}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/home" className="flex cursor-pointer items-center">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Panel de control</span>
                </Link>
              </DropdownMenuItem>
              {userRole === 'instructor' && (
                <DropdownMenuItem asChild>
                  <Link to="/instructor/courses" className="flex cursor-pointer items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Mis cursos</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={async () => {
                  await logout();
                }}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Iniciar sesión</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Registrarse</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNav;
