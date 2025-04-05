
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAuth } from '@/contexts/auth';
import { Bell, MessageSquare } from 'lucide-react';
import { UserMenu } from './header/UserMenu';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/hooks/useLocalization';
import LanguageSelector from '@/components/LanguageSelector';

interface HeaderProps {
  showAuthButtons?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showAuthButtons = true }) => {
  const { user, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const { localizeUrl, isMultiLanguageEnabled } = useLocalization();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate(localizeUrl('/auth/login'));
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 md:gap-4 ml-8 md:ml-0">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-sm">
              <span className="text-sm font-bold">N</span>
            </div>
            <span className="hidden font-bold text-lg sm:inline-block">
              Nexo Educativo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector - only shown when multi-language is enabled */}
          {isMultiLanguageEnabled && <LanguageSelector />}
          
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-muted/40 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  2
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-muted/40 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
              <UserMenu />
            </>
          ) : showAuthButtons ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(localizeUrl('/auth/login'))}
                className="rounded-full hover:bg-muted/40 transition-colors"
              >
                Iniciar Sesión
              </Button>
              <Button 
                size="sm" 
                onClick={() => navigate(localizeUrl('/auth/register'))}
                className="rounded-full transition-transform hover:scale-105 active:scale-95"
              >
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
