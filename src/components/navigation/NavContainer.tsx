
import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';

export interface NavContainerProps {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const NavContainer: React.FC<NavContainerProps> = ({
  children,
  className,
  footer,
  header
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div 
      className={cn(
        "flex h-full flex-col bg-background border-r border-border/70",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {header && (
        <div className="flex-shrink-0 border-b border-border/60">
          {header}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <div className="p-3">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="flex-shrink-0 border-t border-border/60">
          {footer}
        </div>
      )}
    </div>
  );
};

export default NavContainer;
