
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Bell, MessageSquare } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { UserMenu } from './header/UserMenu';
import Logo from '@/components/Logo';
import GlobalRoleSwitcher from './GlobalRoleSwitcher';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const { toggleSidebar, state } = useSidebar();
  const isAdmin = userRole === 'admin';

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn(
              "md:hidden",
              state === "expanded" ? "text-primary" : ""
            )}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menú lateral</span>
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Nexo Educativo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Global Role Switcher para administradores */}
          {isAdmin && (
            <div className="mr-2">
              <GlobalRoleSwitcher />
            </div>
          )}
          
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  2
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
              <UserMenu />
            </>
          ) : showAuthButtons ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth/login')}>
                Iniciar Sesión
              </Button>
              <Button size="sm" onClick={() => navigate('/auth/register')}>
                Registrarse
              </Button>
            </>
          ) : null}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
