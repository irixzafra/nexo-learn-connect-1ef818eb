
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface AuthenticatedHeaderProps {
  onToggleSidebar?: () => void;
}

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ 
  onToggleSidebar 
}) => {
  return (
    <header className="border-b py-2.5 px-4 bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="md:hidden rounded-full hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/app" className="flex items-center transition-opacity hover:opacity-90">
            <Logo />
            <span className="ml-2.5 font-semibold text-lg hidden md:inline-block">Nexo Learning</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex space-x-1">
            <Button variant="ghost" asChild className="px-4 rounded-full hover:bg-primary/10 font-medium">
              <Link to="/app/courses">Mis Cursos</Link>
            </Button>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
