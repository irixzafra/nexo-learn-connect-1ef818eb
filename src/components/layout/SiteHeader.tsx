
import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="font-bold">Academia LMS</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Iniciar sesión
          </Link>
          <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2 rounded-md">
            Registrarse
          </Link>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
