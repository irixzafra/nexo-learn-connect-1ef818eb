
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';
import { toast } from 'sonner';

interface SafeLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  validateRoute?: boolean;
  showToastOnInvalid?: boolean;
  fallbackRoute?: string;
  className?: string;
  activeClassName?: string;
}

const SafeLink: React.FC<SafeLinkProps> = ({ 
  to, 
  children, 
  validateRoute = true, 
  showToastOnInvalid = true,
  fallbackRoute = '/',
  className = '',
  activeClassName = '',
  ...props 
}) => {
  // Si la validación está activada, intenta verificar si la ruta está definida en routeMap
  let routePath = to;
  
  if (validateRoute) {
    // Esta es una validación simple, en una implementación real sería más robusta
    const isDefinedRoute = Object.values(routeMap).some(route => 
      typeof route === 'string' && route === to
    );
    
    if (!isDefinedRoute) {
      console.warn(`Potentially broken link: "${to}" is not defined in routeMap`);
      if (showToastOnInvalid) {
        // Solo mostrar el toast en desarrollo
        if (process.env.NODE_ENV === 'development') {
          toast.warning(`Enlace potencialmente roto: "${to}"`, {
            description: "Esta ruta no está definida en routeMap",
            duration: 3000
          });
        }
      }
      
      // Si la ruta no es válida y hay una ruta de fallback, usarla
      if (fallbackRoute) {
        routePath = fallbackRoute;
      }
    }
  }
  
  return (
    <Link to={routePath} className={className} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;
