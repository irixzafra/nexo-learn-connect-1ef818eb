
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import HeaderContent from '@/components/layout/HeaderContent';
import { MobileSidebar } from '@/components/layout/header/MobileSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showAdminNavigation?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  showHeader = true,
}) => {
  const location = useLocation();
  
  // Check if current page is an admin page
  const isAdminPage = location.pathname.includes('/admin');
  const shouldShowHeader = showHeader && !isAdminPage;

  return (
    <SidebarProvider defaultOpen={!isAdminPage}>
      <div className="flex min-h-screen w-full bg-background">
        {!isAdminPage && (
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarContent>
              <SidebarNavigation viewAsRole="current" />
            </SidebarContent>
          </Sidebar>
        )}
        
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {shouldShowHeader && <HeaderContent />}
          
          <main className="flex-1 w-full">
            {children}
          </main>
        </div>
        
        {!isAdminPage && (
          <MobileSidebar viewAsRole="current" />
        )}
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
