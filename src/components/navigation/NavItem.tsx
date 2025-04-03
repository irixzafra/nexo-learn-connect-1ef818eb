
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  icon?: React.ReactNode | LucideIcon;
  title: string;
  href: string;
  onClick?: () => void;
  className?: string;
  exact?: boolean;
  badge?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean;
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  title,
  href,
  onClick,
  className,
  exact = false,
  badge,
  tooltip,
  disabled = false,
  isCollapsed = false
}) => {
  const location = useLocation();
  
  // Determine if the current route matches this nav item
  const isActive = exact 
    ? location.pathname === href 
    : location.pathname.startsWith(href);
  
  const linkClassNames = cn(
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
    'hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    isActive 
      ? 'bg-accent text-accent-foreground font-medium' 
      : 'text-foreground/70 hover:text-foreground',
    disabled && 'opacity-50 pointer-events-none',
    className
  );
  
  const content = (
    <Link 
      to={disabled ? '#' : href}
      className={linkClassNames}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
    >
      {Icon && (
        <span className="shrink-0 text-foreground/50">
          {React.isValidElement(Icon) ? Icon : typeof Icon === 'function' ? React.createElement(Icon as LucideIcon, { size: 20 }) : Icon}
        </span>
      )}
      {(!isCollapsed || !Icon) && <span>{title}</span>}
      {badge && <span className="ml-auto">{badge}</span>}
    </Link>
  );
  
  if (tooltip && isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return content;
};

export default NavItem;
