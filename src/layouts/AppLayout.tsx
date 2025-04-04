
import React from 'react';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import AuthenticatedHeader from '@/components/layout/AuthenticatedHeader';
import { useAuth } from '@/contexts/auth';
import { Loader, ChevronRight } from 'lucide-react';
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar';
import InstructorSidebar from '@/components/layout/sidebars/InstructorSidebar';
import StudentSidebar from '@/components/layout/sidebars/StudentSidebar';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isLoading, effectiveRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando...</span>
      </div>
    );
  }

  const renderSidebar = () => {
    if (effectiveRole === 'admin') {
      return <AdminSidebar />;
    } else if (effectiveRole === 'instructor') {
      return <InstructorSidebar />;
    } else {
      return <StudentSidebar />;
    }
  };

  return (
    <SidebarProvider defaultState="expanded" persist={true}>
      <div className="flex min-h-screen flex-col w-full">
        <AuthenticatedHeader />
        
        <div className="flex flex-1 overflow-hidden relative">
          {renderSidebar()}
          
          {/* Nuevo botón de sidebar: más visible y posicionado correctamente */}
          <SidebarTrigger />
          
          <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6">
            <SafeRouteWrapper>
              {children || <Outlet />}
            </SafeRouteWrapper>
          </main>
        </div>
        
        <Toaster position="top-right" />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
