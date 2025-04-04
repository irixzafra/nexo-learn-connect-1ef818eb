
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';
import NavItem from '@/components/navigation/NavItem';

interface SidebarNavGroupProps {
  title: string;
  icon?: LucideIcon;
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
  const filteredItems = items.filter(item => {
    if (!item.requiredRole) return true;
    
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(effectiveRole);
    }
    
    return item.requiredRole === effectiveRole;
  });
  
  // If no items remain after filtering, don't render the group
  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-2">
      {/* Group Header */}
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
          isOpen && "font-medium"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`nav-group-${id}`}
      >
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        
        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm">{title}</span>
            {isOpen ? 
              <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            }
          </>
        )}
      </div>
      
      {/* Group Items */}
      {(isOpen || isCollapsed) && (
        <div 
          id={`nav-group-${id}`}
          className={cn(
            "mt-1 space-y-1 pl-3",
            isCollapsed ? "border-l-0" : "border-l border-border/50 ml-4"
          )}
        >
          {filteredItems.map((item, index) => (
            <NavItem
              key={`${item.label}-${index}`}
              href={item.path || item.url || '#'}
              icon={item.icon}
              title={item.label}
              badge={item.badge}
              disabled={item.disabled}
              isCollapsed={isCollapsed}
              tooltip={isCollapsed ? item.label : undefined}
              exact={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavGroup;
