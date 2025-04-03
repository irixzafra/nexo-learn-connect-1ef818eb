
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Outlet, Link } from 'react-router-dom';
import AuthenticatedHeader from '@/components/layout/AuthenticatedHeader';
import { useAuth } from '@/contexts/auth';
import { Loader, Palette } from 'lucide-react';
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar';
import InstructorSidebar from '@/components/layout/sidebars/InstructorSidebar';
import StudentSidebar from '@/components/layout/sidebars/StudentSidebar';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isLoading, userRole } = useAuth();
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
    if (userRole === 'admin') {
      return <AdminSidebar />;
    } else if (userRole === 'profesor') {
      return <InstructorSidebar />;
    } else {
      return <StudentSidebar />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-64 border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
          isSidebarOpen ? 'block' : 'hidden md:block'
        }`}>
          {renderSidebar()}
          
          {/* Agregamos el enlace al Design System en todas las barras laterales */}
          <div className="px-3 py-2">
            <div className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recursos
            </div>
            <Button asChild variant="ghost" className="w-full justify-start gap-2">
              <Link to="/material-design" className="flex items-center">
                <Palette className="h-4 w-4" />
                <span>Material Design</span>
              </Link>
            </Button>
          </div>
        </div>
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6">
          <SafeRouteWrapper>
            <Outlet />
          </SafeRouteWrapper>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;
