
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { MenuItem } from '@/types/navigation';
import { UserRoleType } from '@/types/auth';

interface SidebarNavGroupProps {
  title: string;
  items: MenuItem[];
  icon?: LucideIcon;
  isCollapsed?: boolean;
  effectiveRole: UserRoleType;
  defaultOpen?: boolean;
  id?: string;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  items,
  icon: Icon,
  isCollapsed = false,
  effectiveRole,
  defaultOpen = false,
  id
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  
  // Update local state when defaultOpen prop changes
  useEffect(() => {
    setIsExpanded(defaultOpen);
  }, [defaultOpen]);
  
  // No mostrar el grupo si no hay elementos visibles para este rol
  const visibleItems = items.filter(item => {
    if (!item.requiredRole) return true;
    
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(effectiveRole);
    }
    
    return item.requiredRole === effectiveRole;
  });
  
  if (visibleItems.length === 0) {
    return null;
  }

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // When collapsed, just show the items without a group header
  if (isCollapsed) {
    return (
      <div className="mb-4 space-y-1.5">
        {visibleItems.map((item) => (
          <SidebarNavItem
            key={item.path || item.url || item.label}
            href={item.path || item.url || '#'}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            isCollapsed={isCollapsed}
            disabled={item.disabled}
            isHighlighted={item.isHighlighted}
          />
        ))}
      </div>
    );
  }

  // Render submenus if they exist
  const renderItems = (items: MenuItem[]): React.ReactNode => {
    return items.map((item) => (
      <React.Fragment key={item.path || item.url || item.label}>
        <SidebarNavItem
          href={item.path || item.url || '#'}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          isCollapsed={isCollapsed}
          disabled={item.disabled}
          isHighlighted={item.isHighlighted}
        />
        {item.submenu && item.submenu.length > 0 && (
          <div className="ml-6 space-y-1 mt-1 mb-2">
            {renderItems(item.submenu)}
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleToggleExpand}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2.5 mb-1 text-sm font-medium rounded-md transition-colors",
          "hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1",
          isExpanded ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-4.5 w-4.5 text-muted-foreground" />}
          <span>{title}</span>
        </div>
        <div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
          )}
        </div>
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 space-y-1.5 ml-2",
          isExpanded ? "max-h-[1000px] opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        {renderItems(visibleItems)}
      </div>
    </div>
  );
};

export default SidebarNavGroup;
