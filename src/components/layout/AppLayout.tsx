
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import HeaderContent from '@/components/layout/HeaderContent';
import { useAuth } from '@/hooks/useAuth';
import RefactoredSidebar from './sidebar/RefactoredSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children,
  showHeader = true 
}) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Don't show header on admin pages
  const isAdminPage = location.pathname.includes('/admin');
  const shouldShowHeader = showHeader && !isAdminPage;
  
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/landing' || location.pathname === '/';
  
  // Don't show sidebar for anonymous users on landing page
  const showSidebar = !(isLandingPage && !isAuthenticated);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {showSidebar && <RefactoredSidebar />}
        
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          {/* Show header only if shouldShowHeader is true */}
          {shouldShowHeader && <HeaderContent />}
          
          <main className="flex-1 w-full">
            <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:ml-[60px] lg:ml-0">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
