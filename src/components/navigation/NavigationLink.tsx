
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { isRouteActive } from '@/utils/routeUtils';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  exact?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
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
}) => {
  const location = useLocation();
  const isActive = isRouteActive(location.pathname, to, exact);
  
  return (
    <Link
      to={to}
      className={cn(className, isActive && activeClassName)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};

export default NavigationLink;
