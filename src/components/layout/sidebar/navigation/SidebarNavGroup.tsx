
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';
import SidebarNavItem from './SidebarNavItem';
import { filterMenuItemsByRole } from '@/config/navigation';

interface SidebarNavGroupProps {
  title: string;
  icon: LucideIcon;
  items: MenuItem[];
  isCollapsed?: boolean;
  defaultOpen?: boolean;
  effectiveRole?: UserRoleType;
  id?: string;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  icon: Icon,
  items,
  isCollapsed = false,
  defaultOpen = false,
  effectiveRole = 'student',
  id = 'group'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Filter items based on role requirements
  const filteredItems = filterMenuItemsByRole(items, effectiveRole);
  
  // If no items remain after filtering, don't render the group
  if (filteredItems.length === 0) {
    return null;
  }

  // For collapsed sidebar, simplify and just show icons
  if (isCollapsed) {
    return (
      <div className="mb-2 px-2">
        <div className="flex items-center justify-center py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sidebar-accent/30 text-sidebar-accent-foreground">
            {<Icon className="h-4 w-4" />}
          </div>
        </div>
        <div className="space-y-1 pt-1">
          {filteredItems.map((item) => (
            <SidebarNavItem
              key={item.label}
              href={item.path || item.url || '#'}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              isCollapsed={true}
              disabled={item.disabled}
              isHighlighted={item.isHighlighted}
            />
          ))}
        </div>
      </div>
    );
  }

  // Expanded sidebar with grouped items
  return (
    <div className="mb-3">
      <div 
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
          isOpen ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
          "cursor-pointer hover:bg-muted/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`nav-group-${id}`}
      >
        <div className="flex items-center gap-2">
          {<Icon className="h-4 w-4" />}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      
      {isOpen && (
        <div 
          id={`nav-group-${id}`}
          className="mt-1 space-y-1 px-2 py-1"
        >
          {filteredItems.map((item) => (
            <SidebarNavItem
              key={item.label}
              href={item.path || item.url || '#'}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              disabled={item.disabled}
              isHighlighted={item.isHighlighted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavGroup;
