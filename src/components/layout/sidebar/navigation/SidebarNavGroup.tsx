
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavGroupProps {
  title: string;
  icon: LucideIcon;
  items: Array<{
    label: string;
    path: string;
    icon?: LucideIcon;
    badge?: number;
    disabled?: boolean;
    isHighlighted?: boolean;
  }>;
  isCollapsed?: boolean;
  defaultOpen?: boolean;
  id?: string;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({
  title,
  icon: Icon,
  items,
  isCollapsed = false,
  defaultOpen = false,
  id = 'group'
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // If no items, don't render the group
  if (items.length === 0) {
    return null;
  }

  // For collapsed sidebar, show a more compact version
  if (isCollapsed) {
    return (
      <div className="mb-2 px-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className="flex items-center justify-center py-2 cursor-pointer hover:bg-muted/30 rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
        
        {isOpen && (
          <div className="space-y-1 pt-1">
            {items.map((item) => (
              <SidebarNavItem
                key={item.label}
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
        )}
      </div>
    );
  }

  // Expanded sidebar with grouped items
  return (
    <div className="mb-2">
      <div 
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
          isOpen ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground",
          "cursor-pointer hover:bg-muted/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`nav-group-${id}`}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
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
          {items.map((item) => (
            <SidebarNavItem
              key={item.label}
              href={item.path}
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
