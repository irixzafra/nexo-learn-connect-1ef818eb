
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/AppHeader';
import HeaderContent from '@/components/layout/HeaderContent';
import { UserRoleType } from '@/types/auth';
import { SidebarProvider, Sidebar, SidebarContent } from '@/components/ui/sidebar';
import SidebarNavigation from '@/components/layout/SidebarNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showAdminNavigation?: boolean;
  viewAsRole?: UserRoleType | 'current';
  onRoleChange?: (role: UserRoleType) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showHeader = true,
  showAdminNavigation = false,
  viewAsRole = 'current',
  onRoleChange 
}) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Determine if we should show the main sidebar based on the route and props
  const shouldShowMainSidebar = !isAdminPage || showAdminNavigation;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {shouldShowMainSidebar && (
          <Sidebar className="border-r bg-sidebar">
            <SidebarContent className="p-0">
              <SidebarNavigation 
                viewAsRole={viewAsRole} 
                onRoleChange={onRoleChange} 
              />
            </SidebarContent>
          </Sidebar>
        )}
        
        <div className="flex flex-col flex-1">
          {showHeader && (
            <AppHeader
              viewAsRole={viewAsRole}
              onRoleChange={onRoleChange}
            />
          )}
          
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
