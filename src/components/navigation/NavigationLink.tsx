
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { isRouteActive } from '@/utils/routeUtils';
import { isValidPath } from '@/utils/routeValidation';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle } from 'lucide-react';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  validatePath?: boolean;
  showInvalidWarning?: boolean;
  external?: boolean;
  deprecated?: boolean;
  tooltipText?: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = 'bg-accent text-accent-foreground',
  exact = false,
  icon,
  onClick,
  ariaLabel,
  validatePath = true,
  showInvalidWarning = true,
  external = false,
  deprecated = false,
  tooltipText,
}) => {
  const location = useLocation();
  const isActive = isRouteActive(location.pathname, to, exact);
  
  // Validar la ruta si se requiere
  const isValid = !validatePath || external || isValidPath(to);
  
  // Construir clases
  const linkClasses = cn(
    className, 
    isActive && activeClassName,
    (deprecated || !isValid) && 'text-muted-foreground/70 hover:text-muted-foreground',
    deprecated && 'line-through decoration-dotted decoration-2',
    'relative'
  );
  
  // Determinar texto de tooltip
  const tooltipContent = tooltipText || 
    (deprecated ? 'Esta ruta está deprecada y será eliminada en futuras versiones' :
     !isValid ? 'Esta ruta podría no ser válida en el sistema' : '');
  
  // Contenido básico del enlace
  const linkContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {(deprecated || (!isValid && showInvalidWarning)) && (
        <AlertCircle className="ml-1 inline-block h-3 w-3 text-amber-500" />
      )}
    </>
  );
  
  // Enlace con posible tooltip
  const linkWithTooltip = (tooltipContent && (deprecated || (!isValid && showInvalidWarning))) ? (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        {external ? (
          <a 
            href={to} 
            className={linkClasses}
            onClick={onClick}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={ariaLabel}
          >
            {linkContent}
          </a>
        ) : (
          <Link
            to={to}
            className={linkClasses}
            onClick={onClick}
            aria-label={ariaLabel}
          >
            {linkContent}
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent side="top">
        <p className="text-xs">{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  ) : external ? (
    <a 
      href={to} 
      className={linkClasses}
      onClick={onClick}
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {linkContent}
    </a>
  ) : (
    <Link
      to={to}
      className={linkClasses}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {linkContent}
    </Link>
  );
  
  return linkWithTooltip;
};

export default NavigationLink;
