
import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { Sidebar, SidebarContent, SidebarTrigger } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import HeaderContent from '@/components/layout/HeaderContent';
import { MobileSidebar } from '@/components/layout/header/MobileSidebar';
import RefactoredSidebarNavigation from '@/components/layout/sidebar/RefactoredSidebarNavigation';
import { useEditMode } from '@/contexts/EditModeContext';
import { cn } from '@/lib/utils';

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
  const { isSidebarOpen, toggleSidebar } = useEditMode();
  
  // Check if current page is an admin page
  const isAdminPage = location.pathname.includes('/admin');
  const shouldShowHeader = showHeader && !isAdminPage;

  // Log toggle state for debugging
  useEffect(() => {
    console.log("Current route:", location.pathname);
    console.log("Is admin page:", isAdminPage);
    console.log("Sidebar is open:", isSidebarOpen);
  }, [location.pathname, isAdminPage, isSidebarOpen]);

  return (
    <SidebarProvider defaultOpen={isSidebarOpen}>
      <div className={cn(
        "flex min-h-screen w-full bg-background transition-all duration-300",
        !isSidebarOpen && "sidebar-collapsed"
      )}>
        {!isAdminPage && (
          <Sidebar variant="sidebar" collapsible={isSidebarOpen ? "none" : "icon"}>
            <SidebarContent>
              <RefactoredSidebarNavigation viewAsRole="current" />
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
          <>
            <MobileSidebar viewAsRole="current" />
            {/* Botón flotante para alternar sidebar */}
            <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 md:block">
              <SidebarTrigger 
                className="shadow-lg" 
                onClick={() => toggleSidebar()}
              />
            </div>
          </>
        )}
      </div>
      
      <Toaster />
    </SidebarProvider>
  );
};

export default AppLayout;
