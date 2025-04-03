
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import SidebarLogoSection from './SidebarLogoSection';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';

const SidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex h-full flex-col py-4">
      <SidebarLogoSection />
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>
      {/* --- INDICADOR DEBUG TEMPORAL --- */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ color: 'lime', fontWeight: 'bold', padding: '5px' }}>
          !!! SidebarContent Rendering Footer !!!
        </div>
      )}
      {/* --- FIN INDICADOR --- */}
      <SidebarFooter isCollapsed={isCollapsed} />
    </div>
  );
};

export default SidebarContent;
