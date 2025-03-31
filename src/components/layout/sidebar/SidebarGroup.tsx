
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarGroupProps {
  label: string;
  icon: LucideIcon;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  icon: Icon,
  children,
  isExpanded,
  onToggle
}) => {
  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-2 rounded-md text-left hover:bg-accent/50 group transition-colors"
      >
        <div className="flex items-center">
          <Icon className="h-4 w-4 mr-2 text-primary shrink-0" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isExpanded ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="pl-8 pr-2 py-1">
          {children}
        </div>
      </div>
    </div>
  );
};
