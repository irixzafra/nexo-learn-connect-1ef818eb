
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';

interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  badge?: number;
  disabled?: boolean;
  isHighlighted?: boolean;
}

interface SidebarNavGroupProps {
  title: string;
  icon?: LucideIcon;
  isCollapsed?: boolean;
  defaultOpen?: boolean;
  id?: string;
  items: NavItem[];
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  icon: Icon,
  isCollapsed = false,
  defaultOpen = false,
  id,
  items
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { state } = useSidebar();
  isCollapsed = isCollapsed || state === "collapsed";

  // Handle toggle group
  const toggleGroup = () => {
    if (!isCollapsed) {
      setIsOpen(!isOpen);
    }
  };
  
  if (isCollapsed) {
    return (
      <div className="mb-2">
        {/* Group Label */}
        <div className="relative">
          <div className="flex w-full items-center justify-center">
            {Icon && (
              <button
                onClick={toggleGroup}
                className="w-full p-2 hover:bg-muted/70 rounded-md flex items-center justify-center"
                aria-label={title}
              >
                <Icon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {/* Group Items */}
        <div className="mt-1 space-y-1">
          {items.map((item, index) => (
            <SidebarNavItem 
              key={index} 
              href={item.path} 
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

  return (
    <div className="mb-2">
      {/* Group Label */}
      <button
        onClick={toggleGroup}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{title}</span>
        </div>
        <div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </button>
      
      {/* Group Items */}
      <div 
        className={cn("mt-1 space-y-1", isOpen ? "block" : "hidden")}
        id={id}
      >
        {items.map((item, index) => (
          <SidebarNavItem 
            key={index} 
            href={item.path} 
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            disabled={item.disabled}
            isHighlighted={item.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarNavGroup;
