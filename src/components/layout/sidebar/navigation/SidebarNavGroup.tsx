
import React, { useState } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import SidebarNavItem from './SidebarNavItem';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  id: string;
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

  // When sidebar is collapsed, render a compact version
  if (isCollapsed) {
    return (
      <div className="py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-full flex justify-center p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>

        <div className="space-y-1 mt-1">
          {items.map((item, index) => (
            <SidebarNavItem
              key={`${id}-item-${index}`}
              label={item.label}
              path={item.path}
              icon={item.icon}
              badge={item.badge}
              disabled={item.disabled}
              isHighlighted={item.isHighlighted}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full expanded version
  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-all",
          isOpen ? "text-foreground" : "text-muted-foreground",
          "hover:bg-muted/50"
        )}
        aria-controls={id}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5" />}
          <span className="font-medium">{title}</span>
        </div>
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")}
        />
      </button>

      {isOpen && (
        <div id={id} className="mt-1 space-y-1 px-2">
          {items.map((item, index) => (
            <SidebarNavItem
              key={`${id}-item-${index}`}
              label={item.label}
              path={item.path}
              icon={item.icon}
              badge={item.badge}
              disabled={item.disabled}
              isHighlighted={item.isHighlighted}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavGroup;
