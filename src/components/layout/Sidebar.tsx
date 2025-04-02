
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarContent from './sidebar/SidebarContent';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border transition-all duration-300 ease-in-out bg-background",
        "md:static md:translate-x-0",
        isExpanded ? 'translate-x-0' : '-translate-x-full md:w-16'
      )}
    >
      <div className="flex h-full flex-col">
        <SidebarContent />
      </div>
    </aside>
  );
};

export default Sidebar;
