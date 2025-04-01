
import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Academia LMS. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Términos
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
