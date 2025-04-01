
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import ConditionalHeader from '@/components/layout/header/ConditionalHeader';

interface AppLayoutProps {
  children?: ReactNode;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showHeader = true
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNavigation />
        
        <div className="flex-1 flex flex-col min-h-screen">
          {showHeader && <ConditionalHeader />}
          
          <main className="flex-1 pt-2 px-4 md:px-6 overflow-x-hidden bg-background/70">
            {children}
          </main>
        </div>
        
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
