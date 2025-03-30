
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import HeaderContent from '@/components/layout/HeaderContent';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  showHeader = true 
}) => {
  const location = useLocation();
  
  // Don't show header on admin pages
  const isAdminPage = location.pathname.includes('/admin');
  const shouldShowHeader = showHeader && !isAdminPage;

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarNavigation viewAsRole="current" />
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Show header only if shouldShowHeader is true */}
          {shouldShowHeader && <HeaderContent />}
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
