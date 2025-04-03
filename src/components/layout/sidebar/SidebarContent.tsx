
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarNavigation from './SidebarNavigation';
import { LogoContainer } from '@/components/navigation';

const SidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex h-full flex-col">
      <LogoContainer 
        title="Nexo Learning" 
        subtitle="ecosistema educativo" 
      />
      
      <div className="flex-1 overflow-y-auto py-2 px-3 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-green-500 font-medium px-3 py-1 mb-1 border-t border-dashed border-green-200/30">
          SidebarContent rendering
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
