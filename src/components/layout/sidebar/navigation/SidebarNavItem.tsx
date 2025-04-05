
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface SidebarNavItemProps {
  label: string;
  path: string;
  icon?: LucideIcon;
  badge?: number;
  disabled?: boolean;
  isHighlighted?: boolean;
  isCollapsed?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  label,
  path,
  icon: Icon,
  badge,
  disabled = false,
  isHighlighted = false,
  isCollapsed = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      toast.info("Esta funcionalidad estará disponible próximamente");
    }
  };

  const itemContent = (
    <Link
      to={disabled ? '#' : path}
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between group gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
        isActive ? 
          "bg-primary/10 text-primary border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]" : 
          "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        isHighlighted && !isActive && "border-l-[3px] border-l-secondary pl-[calc(0.75rem-3px)]",
        disabled && "opacity-60 cursor-not-allowed hover:bg-transparent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      )}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={disabled}
    >
      <span className="flex items-center gap-3">
        {Icon && (
          <Icon 
            className={cn(
              "h-5 w-5 flex-shrink-0", 
              isActive ? 
                "text-primary" : 
                "text-muted-foreground group-hover:text-foreground",
              disabled && "text-muted-foreground/60"
            )} 
            aria-hidden="true" 
          />
        )}
        {!isCollapsed && <span>{label}</span>}
      </span>
      
      {!isCollapsed && badge && badge > 0 && (
        <Badge variant="outline" className="ml-auto px-1.5 min-w-5 text-center">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
      
      {!isCollapsed && disabled && (
        <span className="ml-auto text-xs bg-muted/30 text-muted-foreground px-1.5 py-0.5 rounded">
          Próx.
        </span>
      )}
    </Link>
  );

  // When the sidebar is collapsed, wrap the item in a tooltip
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {itemContent}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
          {badge && badge > 0 && (
            <Badge variant="outline" className="ml-1 px-1 min-w-4 text-center">
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return itemContent;
};

export default SidebarNavItem;
