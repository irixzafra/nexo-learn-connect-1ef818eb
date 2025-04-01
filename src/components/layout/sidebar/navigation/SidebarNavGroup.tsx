
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { MenuItem } from '@/types/navigation';
import { UserRoleType } from '@/types/auth';

interface SidebarNavGroupProps {
  title: string;
  items: MenuItem[];
  icon?: React.ElementType;
  isCollapsed: boolean;
  effectiveRole: UserRoleType;
  defaultOpen?: boolean;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  items,
  icon: Icon,
  isCollapsed,
  effectiveRole,
  defaultOpen = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultOpen);
  
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (isCollapsed) {
    return (
      <div className="mb-4">
        {visibleItems.map(item => (
          <SidebarNavItem
            key={item.path || item.url}
            to={item.path || item.url || '#'}
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
        onClick={toggleExpanded}
        className="flex items-center justify-between w-full px-3 py-2 mb-1 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center">
          {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
          <span>{title}</span>
        </div>
        <div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all space-y-1",
          isExpanded ? "max-h-96" : "max-h-0"
        )}
      >
        {visibleItems.map(item => (
          <SidebarNavItem
            key={item.path || item.url}
            to={item.path || item.url || '#'}
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
