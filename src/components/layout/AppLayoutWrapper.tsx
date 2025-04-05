
import React, { ReactNode } from 'react';
import AppHeader from './AppHeader';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import SidebarContent from './sidebar/SidebarContent';

interface AppLayoutWrapperProps {
  children: ReactNode;
}

const AppLayoutWrapper: React.FC<AppLayoutWrapperProps> = ({ children }) => {
  return (
    <SidebarProvider defaultState="expanded" persist={true}>
      <div className="flex min-h-screen">
        <div className="hidden md:flex flex-col w-64 bg-background border-r">
          <SidebarContent />
        </div>
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayoutWrapper;
