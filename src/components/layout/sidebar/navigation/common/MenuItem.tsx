
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number | React.ReactNode;
  isCollapsed: boolean;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badge, 
  isCollapsed,
  disabled = false
}) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);
  
  const renderBadge = () => {
    if (badge === undefined) return null;
    
    // For React element badges (like custom components)
    if (React.isValidElement(badge)) {
      return badge;
    }
    
    // For number badges
    if (typeof badge === 'number' && badge > 0) {
      return (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge > 99 ? '99+' : badge}
        </span>
      );
    }
    
    // For string badges
    if (typeof badge === 'string') {
      return (
        <span className="ml-auto flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge}
        </span>
      );
    }
    
    return null;
  };
  
  const content = (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={(e) => disabled && e.preventDefault()}
    >
      <Icon className="h-4 w-4" />
      {!isCollapsed && (
        <>
          <span>{label}</span>
          {renderBadge()}
        </>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {label}
          {renderBadge()}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default MenuItem;
