
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import HeaderContent from '@/components/layout/HeaderContent';

interface AppLayoutProps {
  children: React.ReactNode;
}

type ViewAsRole = 'current' | UserRole;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useState<ViewAsRole>('current');

  const getEffectiveRole = () => {
    if (viewAsRole === 'current') return userRole;
    return viewAsRole;
  };

  const effectiveRole = getEffectiveRole();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/10">
        <AppSidebar 
          viewAsRole={viewAsRole}
          onRoleChange={(role) => setViewAsRole(role as ViewAsRole)}
        />
        
        <div className="flex-1 min-w-0 overflow-auto">
          <header className="border-b bg-background">
            <HeaderContent userRole={userRole} />
          </header>
          
          <main className="min-h-[calc(100vh-60px)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
