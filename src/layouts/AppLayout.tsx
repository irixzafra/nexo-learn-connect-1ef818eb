
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { Outlet } from 'react-router-dom';
import { UserRoleType } from '@/types/auth';
import SidebarNavigation from '@/components/layout/SidebarNavigation';
import AppHeader from '@/components/layout/AppHeader';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children?: React.ReactNode;
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
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarNavigation 
          viewAsRole={viewAsRole} 
          onRoleChange={onRoleChange} 
        />
        
        <div className="flex-1 flex flex-col">
          {showHeader && <AppHeader />}
          
          <main className={cn(
            "flex-1 flex flex-col",
            showAdminNavigation ? "pt-0" : "pt-0"
          )}>
            {/* The main content - either passed children or outlet from router */}
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
