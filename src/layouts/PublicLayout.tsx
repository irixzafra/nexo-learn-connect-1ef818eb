
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/nexo-logo';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth/');
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <NexoLogo className="text-xl" />
          </Link>
          
          {!isAuthPage && (
            <div className="flex items-center gap-4">
              <Link to="/auth/login">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link to="/auth/register">
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexo Learning Platform. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
