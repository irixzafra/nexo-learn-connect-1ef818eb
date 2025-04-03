
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
        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground px-1.5">
          {badge > 99 ? '99+' : badge}
        </span>
      );
    }
    
    // For string badges
    if (typeof badge === 'string') {
      return (
        <span className="ml-auto flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
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
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-primary border-l-[3px] border-l-primary pl-[calc(0.75rem-3px)]" 
          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
      )}
      onClick={(e) => disabled && e.preventDefault()}
      aria-disabled={disabled}
    >
      <Icon className={cn("h-4.5 w-4.5", isActive ? "text-primary" : "text-muted-foreground")} />
      {!isCollapsed && (
        <>
          <span className="text-[14px]">{label}</span>
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
        <TooltipContent side="right" className="flex items-center gap-2 bg-popover shadow-md border border-border py-1.5 px-3">
          {label}
          {renderBadge()}
        </TooltipContent>
      </Tooltip>
    );
  }

  return content;
};

export default MenuItem;
