
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavGroupProps {
  title: string;
  icon?: LucideIcon;
  defaultExpanded?: boolean;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

const NavGroup: React.FC<NavGroupProps> = ({
  title,
  icon: Icon,
  defaultExpanded = false,
  isCollapsed = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // If collapsed sidebar, we render children without expandable container
  if (isCollapsed) {
    return (
      <div className="my-2">
        {Icon && (
          <div className="flex items-center justify-center py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
              {React.createElement(Icon, { className: "h-4 w-4" })}
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
  
  return (
    <div className="mb-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex w-full items-center justify-between py-2 px-3 text-sm font-medium rounded-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1",
          "transition-colors hover:bg-muted/30",
          isExpanded ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {Icon && React.createElement(Icon, { className: "h-4.5 w-4.5" })}
          <span className="text-[14px] font-medium">{title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded ? "rotate-180 transform" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "pl-3 overflow-hidden transition-all duration-200 ease-in-out",
          isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default NavGroup;
