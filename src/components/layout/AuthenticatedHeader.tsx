
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
    <header className="border-b py-3 px-4 bg-white dark:bg-slate-950">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menú</span>
          </Button>
          
          <Link to="/app" className="flex items-center">
            <Logo />
            <span className="ml-2 font-semibold text-lg hidden md:inline-block">Nexo Learning</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-2">
            <Button variant="ghost" asChild>
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
