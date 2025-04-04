
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

  return (
    <Link
      to={disabled ? '#' : href}
      onClick={(e) => disabled && e.preventDefault()}
      className={cn(
        "flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        disabled && "opacity-60 cursor-not-allowed hover:bg-transparent",
        isHighlighted && !isActive && "text-accent-foreground font-medium",
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-current")} />}
        {(!isCollapsed || !Icon) && (
          <span>{label}</span>
        )}
      </div>
      
      {badge && badge > 0 && !isCollapsed && (
        <Badge variant="outline" className="ml-auto text-xs px-1">
          {badge > 99 ? '99+' : badge}
        </Badge>
      )}
      
      {disabled && !isCollapsed && (
        <span className="ml-auto text-xs text-muted-foreground">Próximamente</span>
      )}
    </Link>
  );
};

export default SidebarNavItem;
