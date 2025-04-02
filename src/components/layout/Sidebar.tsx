
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarNavigation from './SidebarNavigation';

const Sidebar: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out md:static md:translate-x-0 
        ${isExpanded ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex h-full flex-col">
        <SidebarNavigation />
      </div>
    </aside>
  );
};

export default Sidebar;
