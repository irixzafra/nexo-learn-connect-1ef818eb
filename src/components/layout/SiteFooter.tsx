
import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container h-14 flex flex-col md:flex-row items-center justify-between">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Academia LMS. Todos los derechos reservados.
        </p>
        <nav className="flex items-center gap-4">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Términos
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default SiteFooter;
