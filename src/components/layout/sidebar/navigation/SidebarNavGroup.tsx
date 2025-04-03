
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { MenuItem } from '@/types/navigation';
import { UserRoleType } from '@/types/auth';
import { useSidebarState } from '@/components/layout/sidebar/useSidebarState';

interface SidebarNavGroupProps {
  title: string;
  items: MenuItem[];
  icon?: React.ElementType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  defaultOpen?: boolean;
  id?: string;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  items,
  icon: Icon,
  isCollapsed,
  effectiveRole,
  defaultOpen = false,
  id
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  const { toggleExpanded } = useSidebarState();
  
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
    
    // Find the group ID in the navigationGroups array to use with toggleExpanded
    if (id) {
      toggleExpanded(id as any);
    }
  };

  if (isCollapsed) {
    return (
      <div className="mb-4 space-y-1.5">
        {visibleItems.map(item => (
          <SidebarNavItem
            key={item.path || item.url}
            href={item.path || item.url || '#'}
            icon={item.icon as React.ElementType}
            label={item.label}
            badge={typeof item.badge === 'number' ? item.badge : undefined}
            isCollapsed={isCollapsed}
            disabled={item.disabled}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <button
        onClick={handleToggleExpand}
        className="flex items-center justify-between w-full px-3 py-2.5 mb-1 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1"
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
          isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        {visibleItems.map(item => (
          <SidebarNavItem
            key={item.path || item.url}
            href={item.path || item.url || '#'}
            icon={item.icon as React.ElementType}
            label={item.label}
            badge={typeof item.badge === 'number' ? item.badge : undefined}
            isCollapsed={isCollapsed}
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavGroup;
