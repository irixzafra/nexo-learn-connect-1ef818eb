
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from '@/components/layout/sidebar/SidebarNavigation';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { InlineEditorProvider } from '@/contexts/InlineEditorContext';
import InlineEditControls from '@/components/admin/InlineEditControls';
import { useAuth } from '@/contexts/auth';

const AppLayout: React.FC = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  return (
    <InlineEditorProvider>
      <SidebarProvider>
        <div className="flex h-screen">
          <SidebarNavigation />
          
          <main className="flex-1 overflow-auto bg-background">
            <Outlet />
          </main>
          
          {isAdmin && <InlineEditControls />}
        </div>
      </SidebarProvider>
    </InlineEditorProvider>
  );
};

export default AppLayout;
