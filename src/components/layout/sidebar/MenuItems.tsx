
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface MenuItemProps {
  to?: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed = false,
  onClick,
  className = ""
}) => {
  const content = (
    <>
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span className="ml-2">{label}</span>}
      {badge !== undefined && badge > 0 && !isCollapsed && (
        <Badge variant="destructive" className="ml-auto">
          {badge}
        </Badge>
      )}
      {badge !== undefined && badge > 0 && isCollapsed && (
        <Badge 
          variant="destructive" 
          className="absolute top-0 right-0 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          {badge}
        </Badge>
      )}
    </>
  );
  
  // Si hay onClick, usar un botón
  if (onClick) {
    const buttonContent = (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center px-3 py-2 rounded-md transition-colors relative w-full text-left",
          "hover:bg-accent/50",
          className
        )}
      >
        {content}
      </button>
    );
    
    return isCollapsed ? (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            {buttonContent}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    ) : buttonContent;
  }
  
  // Si hay to, usar un NavLink
  if (to) {
    const linkContent = (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            "flex items-center px-3 py-2 rounded-md transition-colors relative",
            isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
            className
          )
        }
      >
        {content}
      </NavLink>
    );
    
    return isCollapsed ? (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            {linkContent}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    ) : linkContent;
  }
  
  // Si no hay to ni onClick, mostrar solo el contenido
  return (
    <div className={cn(
      "flex items-center px-3 py-2 rounded-md transition-colors relative",
      "hover:bg-accent/50",
      className
    )}>
      {content}
    </div>
  );
};
