import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { LucideIcon } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuTrigger,
  SidebarMenuContent
} from '@/components/ui/sidebar';
import { MenuItem } from '../MenuItems';
import { useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path?: string;
  icon?: LucideIcon;
  badge?: number;
  disabled?: boolean;
  isHighlighted?: boolean;
}

interface SidebarNavGroupProps {
  title: string;
  icon?: LucideIcon;
  defaultOpen?: boolean;
  id: string;
  items: MenuItem[];
  isCollapsed?: boolean;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  icon: Icon,
  defaultOpen = false,
  id,
  items,
  isCollapsed = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { state } = useSidebar();
  const sidebarIsCollapsed = state === "collapsed";
  const location = useLocation();

  // Function to capitalize first letter of each word in the title
  const capitalizeTitle = (text: string) => {
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const capitalizedTitle = capitalizeTitle(title);

  if (sidebarIsCollapsed) {
    return (
      <div className="px-1 py-1">
        <div
          className="flex h-9 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
          title={capitalizedTitle}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu defaultOpen={defaultOpen} collapsible>
      <SidebarMenuTrigger 
        className="flex w-full items-center justify-between py-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5" />}
          <span className="text-sm font-medium">{capitalizedTitle}</span>
        </div>
        <ChevronRight className={cn(
          "h-4 w-4 transition-transform duration-200",
          isOpen && "rotate-90 transform"
        )} />
      </SidebarMenuTrigger>
      <SidebarMenuContent>
        <div className="pl-10 pr-2">
          {items.map((item, index) => {
            // Check if the current route matches this item's path
            const isActive = item.path ? location.pathname.startsWith(item.path) : false;
            
            return (
              <MenuItem
                key={`${id}-item-${index}`}
                to={item.path || '#'}
                icon={item.icon || (() => null)}
                label={item.label}
                badge={item.badge}
                disabled={item.disabled}
                isCollapsed={sidebarIsCollapsed}
              />
            );
          })}
        </div>
      </SidebarMenuContent>
    </SidebarMenu>
  );
};

export default SidebarNavGroup;
