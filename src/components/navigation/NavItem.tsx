
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import type { LucideIcon } from 'lucide-react';

export interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number | string;
  isCollapsed?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  external?: boolean;
  description?: string;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed = false,
  disabled = false,
  className,
  onClick,
  external = false,
  description
}) => {
  const LinkComponent = external ? 'a' : NavLink;
  const linkProps = external ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };
  
  const renderBadge = () => {
    if (!badge) return null;
    
    return (
      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/90 text-[11px] font-medium text-primary-foreground px-1.5">
        {typeof badge === 'number' && badge > 99 ? '99+' : badge}
      </span>
    );
  };
  
  const content = (
    <LinkComponent
      {...linkProps}
      className={({ isActive }: { isActive: boolean }) => cn(
        "flex items-center gap-3 py-2.5 px-3 text-sm font-medium transition-all duration-200 rounded-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
        isActive 
          ? "bg-primary/10 text-primary border-l-2 border-l-primary pl-[calc(0.75rem-2px)]" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        isCollapsed && "justify-center p-2.5",
        className
      )}
      onClick={(e) => {
        if (disabled) e.preventDefault();
        if (onClick) onClick();
      }}
      aria-disabled={disabled}
    >
      <Icon className={cn(
        "h-5 w-5 flex-shrink-0", 
        isCollapsed ? "m-0" : "mr-1"
      )} />
      
      {!isCollapsed && (
        <>
          <span className="truncate">{label}</span>
          {renderBadge()}
        </>
      )}
    </LinkComponent>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2 py-1 px-2 shadow-md border">
          <span>{label}</span>
          {renderBadge()}
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default NavItem;
