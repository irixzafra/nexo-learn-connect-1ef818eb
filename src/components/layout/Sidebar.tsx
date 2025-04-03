
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { cn } from '@/lib/utils';
import SidebarContent from './sidebar/SidebarContent';

const Sidebar: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 transform border-r border-border/70 transition-all duration-300 ease-in-out bg-background",
        "md:static md:translate-x-0",
        isExpanded ? 'translate-x-0 shadow-md w-64' : '-translate-x-full md:w-20 md:translate-x-0',
        "focus-within:outline-none focus-within:ring-0"
      )}
    >
      <div className="flex h-full flex-col">
        <SidebarContent />
      </div>
    </aside>
  );
};

export default Sidebar;
