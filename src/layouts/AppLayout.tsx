
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { InlineEditorProvider } from '@/contexts/InlineEditorContext';
import { useAuth } from '@/contexts/auth';
import Header from '@/components/layout/Header';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  return (
    <InlineEditorProvider>
      <SidebarProvider>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            
            <main className="flex-1 overflow-auto bg-background">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </InlineEditorProvider>
  );
};

export default AppLayout;
