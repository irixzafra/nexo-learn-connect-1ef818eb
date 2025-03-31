
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
      {!isCollapsed && (
        <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <div className={cn(
        "space-y-1",
        isCollapsed && "flex flex-col items-center"
      )}>
        {children}
      </div>
    </div>
  );
};

export default SidebarNavSection;
