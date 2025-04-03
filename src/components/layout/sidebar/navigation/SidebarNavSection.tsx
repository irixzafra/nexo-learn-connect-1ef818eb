
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
        <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="space-y-1.5">
        {children}
      </div>
    </div>
  );
};

export default SidebarNavSection;
