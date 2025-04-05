
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { cn } from '@/lib/utils';
import SidebarNavigation from './sidebar/SidebarNavigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import SidebarFooter from './sidebar/SidebarFooter';

const Sidebar: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <>
      {/* Actual sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col transform border-r border-border/70 transition-all duration-300 ease-in-out bg-background",
          "md:static md:translate-x-0",
          isExpanded ? 'translate-x-0 shadow-md w-64' : '-translate-x-full md:w-20 md:translate-x-0',
          "focus-within:outline-none focus-within:ring-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar trigger positioned after logo */}
          <div className="flex items-center justify-end p-4 border-b border-border/60">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <SidebarNavigation />
          </div>
          
          {/* Add the sidebar footer */}
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
