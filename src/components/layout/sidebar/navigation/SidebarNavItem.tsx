
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon?: LucideIcon;
  badge?: number;
  disabled?: boolean;
  isCollapsed?: boolean;
  isHighlighted?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  href,
  label,
  icon: Icon,
  badge,
  disabled = false,
  isCollapsed = false,
  isHighlighted = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(`${href}/`);

  const content = (
    <Link
      to={disabled ? '#' : href}
      onClick={(e) => disabled && e.preventDefault()}
      className={cn(
        "flex items-center justify-between rounded-md p-2 text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        disabled && "opacity-60 cursor-not-allowed hover:bg-transparent",
        isHighlighted && !isActive && "text-accent-foreground font-medium",
        isCollapsed && "px-2 justify-center"
      )}
    >
      <div className={cn(
        "flex items-center gap-2",
        isCollapsed && "flex-col gap-1"
      )}>
        {Icon && <Icon className={cn(
          "h-5 w-5", 
          isActive ? "text-primary" : "text-current",
          isCollapsed && "h-5 w-5"
        )} />}
        
        {(!isCollapsed || !Icon) && (
          <span className={cn(
            isCollapsed && "text-xs"
          )}>{label}</span>
        )}
      </div>
      
      {badge && badge > 0 && !isCollapsed && (
        <Badge variant="outline" className="ml-auto text-xs px-1">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
      
      {badge && badge > 0 && isCollapsed && (
        <Badge variant="outline" className="absolute -top-1 -right-1 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center px-1">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <div className="relative mb-1">
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
            {disabled && <p className="text-xs text-muted-foreground">Próximamente</p>}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return content;
};

export default SidebarNavItem;
