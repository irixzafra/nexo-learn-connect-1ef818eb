
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/AppHeader';
import ConditionalSidebar from '@/components/layout/ConditionalSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { toUserRoleType } from '@/types/auth';
import { getRoleName, getHomePath } from '@/utils/roleUtils';
import { useNotifications } from '@/hooks/useNotifications';

const AppLayout: React.FC = () => {
  // Get user role and other necessary data
  const { userRole, effectiveRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications?.() || { unreadCount: 0 };
  const messagesCount = 3; // Demo value for unread messages
  const currentUserRole = toUserRoleType(userRole as string);
  const currentEffectiveRole = toUserRoleType(effectiveRole as string) || currentUserRole;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar Condicional que se muestra dependiendo del rol */}
        <ConditionalSidebar 
          userRole={currentUserRole}
          effectiveRole={currentEffectiveRole}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          currentViewRole={currentEffectiveRole}
          getRoleName={getRoleName}
          getHomePath={getHomePath}
        />
        
        {/* Contenido principal */}
        <div className="flex flex-col flex-1">
          {/* Header que incluye el nuevo componente BreadcrumbHeader */}
          <AppHeader />
          
          {/* Área de contenido principal */}
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        
        {/* Sistema de notificaciones toast */}
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
