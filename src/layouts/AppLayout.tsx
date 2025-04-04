
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import AuthenticatedHeader from '@/components/layout/AuthenticatedHeader';
import { useAuth } from '@/contexts/auth';
import { Loader } from 'lucide-react';
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar';
import InstructorSidebar from '@/components/layout/sidebars/InstructorSidebar';
import StudentSidebar from '@/components/layout/sidebars/StudentSidebar';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import { SidebarProvider } from '@/components/ui/sidebar/sidebar-provider';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isLoading, effectiveRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

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
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 overflow-hidden">
          <div className={`w-64 border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
            isSidebarOpen ? 'block' : 'hidden md:block'
          }`}>
            {renderSidebar()}
          </div>
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
