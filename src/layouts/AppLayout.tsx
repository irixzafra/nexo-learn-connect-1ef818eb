
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/AppHeader';
import ConditionalSidebar from '@/components/layout/ConditionalSidebar';

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar Condicional que se muestra dependiendo del rol */}
        <ConditionalSidebar />
        
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
