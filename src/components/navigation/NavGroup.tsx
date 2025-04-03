
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface NavGroupProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  isCollapsed?: boolean;
  className?: string;
}

const NavGroup: React.FC<NavGroupProps> = ({
  title,
  icon: Icon,
  children,
  defaultExpanded = true,
  isCollapsed = false,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  if (isCollapsed) {
    return (
      <div className={cn("mb-2 px-1", className)}>
        {Icon && (
          <div className="flex items-center justify-center py-2 text-muted-foreground">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div className="space-y-1 mt-1">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mb-4", className)}>
      <button
        onClick={toggleExpanded}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md",
          "text-muted-foreground hover:text-foreground transition-colors",
          "hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4.5 w-4.5" />}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 transition-transform" />
        ) : (
          <ChevronRight className="h-4 w-4 transition-transform" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out pl-2",
          isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 py-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavGroup;
