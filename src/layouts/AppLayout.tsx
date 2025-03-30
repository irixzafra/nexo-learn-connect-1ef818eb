
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider 
} from '@/components/ui/sidebar';
import RefactoredSidebarNavigation from '@/components/layout/sidebar/RefactoredSidebarNavigation';
import AppHeader from '@/components/layout/AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  contentClassName?: string;
}

/**
 * Main layout component for the application
 */
const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebar = true,
  showHeader = true,
  contentClassName = ""
}) => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  // Role switching state (for admin view-as functionality)
  const [viewAsRole, setViewAsRole] = useState<'current' | UserRoleType>('current');
  
  // Handle role change for "view as" functionality
  const handleRoleChange = (role: UserRoleType) => {
    setViewAsRole(role);
  };
  
  // Determine if showing the sidebar
  const shouldShowSidebar = isAuthenticated && showSidebar;
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        {shouldShowSidebar && (
          <Sidebar className="border-r bg-sidebar">
            <SidebarContent className="p-0">
              <RefactoredSidebarNavigation
                viewAsRole={viewAsRole}
                onRoleChange={handleRoleChange}
              />
            </SidebarContent>
          </Sidebar>
        )}
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 w-full">
          {/* Header */}
          {showHeader && <AppHeader viewAsRole={viewAsRole} onRoleChange={handleRoleChange} />}
          
          {/* Main Content */}
          <main className={cn("flex-1", contentClassName)}>
            {children}
          </main>
          
          {/* Footer would go here if needed */}
        </div>
        
        {/* Toaster for displaying notifications */}
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
