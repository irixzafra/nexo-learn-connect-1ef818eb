
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
  badge?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isCollapsed = false,
  badge
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  const itemContent = (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
      {!isCollapsed && (
        <div className="flex items-center justify-between w-full">
          <span>{label}</span>
          {badge !== undefined && badge > 0 && (
            <Badge variant="outline" className="ml-auto text-xs">
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </div>
      )}
    </Link>
  );
  
  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {itemContent}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
          {badge !== undefined && badge > 0 && (
            <Badge variant="outline" className="ml-2 text-xs">
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  return itemContent;
};

export default MenuItem;
