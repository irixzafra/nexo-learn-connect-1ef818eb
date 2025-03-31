
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarNavSectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({ 
  title, 
  isCollapsed, 
  children 
}) => {
  return (
    <div className="mb-4">
      {title && !isCollapsed && (
        <h2 className="mb-2 px-4 text-xs font-semibold text-muted-foreground tracking-tight">
          {title}
        </h2>
      )}
      <ul className={cn(
        "space-y-1",
        isCollapsed ? "px-2" : "px-1"
      )}>
        {children}
      </ul>
    </div>
  );
};

export default SidebarNavSection;
