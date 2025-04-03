
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface SidebarGroupProps {
  label: string;
  icon: LucideIcon;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  icon: Icon,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4.5 w-4.5" />
          <span className="text-[14px] font-medium">{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isExpanded ? "rotate-180 transform" : ""
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out pl-3",
          isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};
