
import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';

interface SidebarGroupProps {
  label: string;
  icon: LucideIcon;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  icon: Icon,
  isExpanded,
  onToggle,
  children
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {!isCollapsed && <span>{label}</span>}
        </div>
        {!isCollapsed && (
          <div>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}
      </button>
      
      <div className={cn("mt-1", isExpanded ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
};

export default SidebarGroup;
