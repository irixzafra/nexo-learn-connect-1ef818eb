
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import * as LucideIcons from 'lucide-react';
import { CircleDashed } from 'lucide-react';

interface SidebarMainMenuItemProps {
  item: NavigationItemWithChildren;
  badge?: number;
}

export const SidebarMainMenuItem: React.FC<SidebarMainMenuItemProps> = ({ 
  item, 
  badge 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Dynamically get the icon component from Lucide
  const IconComponent = React.useMemo(() => {
    if (!item.icon) return CircleDashed;
    
    if (typeof item.icon === 'string') {
      const iconName = item.icon as string;
      // @ts-ignore - we know this is a valid Lucide icon
      return LucideIcons[iconName] || CircleDashed;
    }
    
    return item.icon;
  }, [item.icon]);

  return (
    <NavLink
      to={item.disabled ? '#' : item.path}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        item.disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
        isCollapsed ? "justify-center" : ""
      )}
      aria-disabled={item.disabled}
    >
      <IconComponent className="h-5 w-5" />
      
      {!isCollapsed && (
        <>
          <span className="truncate">{item.label}</span>
          
          {badge !== undefined && badge > 0 && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </>
      )}
      
      {isCollapsed && badge !== undefined && badge > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </NavLink>
  );
};
