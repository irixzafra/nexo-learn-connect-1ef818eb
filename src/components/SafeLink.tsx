
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  validateRoute?: boolean;
}

const SafeLink: React.FC<SafeLinkProps> = ({ to, children, validateRoute = true, ...props }) => {
  // Si la validación está activada, intenta verificar si la ruta está definida en routeMap
  let routePath = to;
  
  if (validateRoute) {
    // Esta es una validación simple, en una implementación real sería más robusta
    const isDefinedRoute = Object.values(routeMap).some(route => 
      typeof route === 'string' && route === to
    );
    
    if (!isDefinedRoute) {
      console.warn(`Potentially broken link: "${to}" is not defined in routeMap`);
    }
  }
  
  return (
    <Link to={routePath} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;
