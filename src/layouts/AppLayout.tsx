
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import HeaderContent from '@/components/layout/HeaderContent';
import { trackRoleSwitch } from '@/lib/sentry';

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

  const handleRoleChange = (role: UserRole) => {
    if (userRole) {
      trackRoleSwitch(userRole, role);
    }
    setViewAsRole(role as ViewAsRole);
  };

  return (
    <SidebarProvider defaultOpen={window.innerWidth >= 768}>
      <div className="flex min-h-screen w-full bg-muted/10">
        <AppSidebar 
          viewAsRole={viewAsRole}
          onRoleChange={handleRoleChange}
        />
        
        <div className="flex-1 min-w-0 overflow-auto transition-all duration-300">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
            <HeaderContent userRole={userRole} viewingAs={viewAsRole !== 'current' ? viewAsRole : null} />
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
