import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider'; 
import { SidebarMainNavigation } from './navigation/SidebarMainNavigation';

const SidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  return (
    <div className="flex flex-col h-full py-4 overflow-y-auto">
      <div className="px-3 py-2">
        {/* Logo or branding goes here */}
      </div>
      
      <div className="flex-1 px-3">
        <SidebarMainNavigation isCollapsed={!isExpanded} />
      </div>
      
      <div className="px-3 py-2">
        {/* Footer content goes here */}
      </div>
    </div>
  );
};

export default SidebarContent;
