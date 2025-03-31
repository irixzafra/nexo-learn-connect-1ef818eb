
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import HeaderContent from '@/components/layout/HeaderContent';
import { MobileSidebar } from '@/components/layout/header/MobileSidebar';
import AdminNavigation from '@/components/admin/AdminNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  showHeader = true 
}) => {
  const location = useLocation();
  
  // Check if current page is an admin page
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
          
          {/* Show admin navigation on admin pages */}
          {isAdminPage && <AdminNavigation />}
          
          <main className="flex-1 px-6 py-6 md:px-8 max-w-[1400px] mx-auto w-full">
            {children}
          </main>
        </div>
        
        {/* Always include the mobile sidebar for mobile views */}
        <MobileSidebar viewAsRole="current" />
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
