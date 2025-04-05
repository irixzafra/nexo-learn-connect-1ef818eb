
import React from 'react';
import { Link } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Enlaces definidos según el SSOT (Navigation.md)
  const legalLinks = [
    { path: routeMap.terms, label: 'Términos' },
    { path: routeMap.privacy, label: 'Privacidad' },
    // Note: cookies and accessibility links were causing errors because they don't exist in routeMap
  ];

  const helpLinks = [
    { path: routeMap.help, label: 'Ayuda' },
    { path: routeMap.contact, label: 'Contacto' },
  ];

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {currentYear} Nexo Educativo. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          {legalLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {helpLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
