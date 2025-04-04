
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { isRouteActive } from '@/utils/routeUtils';

export interface NavItemProps {
  icon?: LucideIcon;
  title: string;
  href: string;
  onClick?: () => void;
  className?: string;
  exact?: boolean;
  badge?: number;
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
  const isActive = isRouteActive(location.pathname, href, exact);
  
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };
  
  const linkClassNames = cn(
    'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1',
    isActive 
      ? 'bg-primary/10 text-primary font-medium border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]' 
      : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground',
    disabled && 'opacity-50 pointer-events-none',
    className
  );
  
  const content = (
    <Link 
      to={disabled ? '#' : href}
      className={linkClassNames}
      onClick={handleClick}
      aria-disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
    >
      {Icon && (
        <Icon className={cn("h-5 w-5 shrink-0", 
          isActive ? "text-primary" : "text-muted-foreground")} />
      )}
      
      {(!isCollapsed || !Icon) && 
        <span className={cn("text-[14px] font-medium transition-colors", 
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}
        >
          {title}
        </span>
      }
      
      {badge !== undefined && badge > 0 && (
        <Badge variant="outline" className="ml-auto px-1.5 min-w-5 text-center">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
    </Link>
  );
  
  if (tooltip && isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-popover shadow-md border border-border py-1.5 px-3">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return content;
};

export default NavItem;
