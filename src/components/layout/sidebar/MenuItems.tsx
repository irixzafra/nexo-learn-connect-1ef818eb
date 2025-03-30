import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  isCollapsed?: boolean;
  disabled?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed = false,
  disabled = false
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
  
  const content = (
    <div
      className={cn(
        "flex items-center mb-1 py-2 px-3 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-gray-100 dark:bg-gray-800 text-primary"
          : "hover:bg-gray-100 hover:dark:bg-gray-800 text-muted-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 mr-3",
          isActive ? "text-primary" : "text-muted-foreground",
          isCollapsed && "mr-0"
        )}
      />
      
      {!isCollapsed && (
        <span className="flex-1">{label}</span>
      )}
      
      {typeof badge === 'number' && badge > 0 && (
        <Badge variant="default" className="ml-auto rounded-full px-1.5 h-5 min-w-5">
          {badge}
        </Badge>
      )}
    </div>
  );
  
  if (disabled) {
    return content;
  }
  
  return (
    <Link to={to}>
      {content}
    </Link>
  );
};
