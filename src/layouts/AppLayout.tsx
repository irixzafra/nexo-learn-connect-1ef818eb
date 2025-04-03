
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { getRoleName } from '@/utils/roleUtils';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isLoading, effectiveRole, userRole, isViewingAsOtherRole, resetToOriginalRole } = useAuth();
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
    <div className="flex min-h-screen flex-col">
      <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
      
      {/* Role simulation alert banner */}
      {isViewingAsOtherRole && (
        <Alert variant="warning" className="mb-0 rounded-none border-x-0 border-t-0 px-4 py-2 shadow-sm">
          <AlertDescription className="flex items-center justify-between">
            <div>
              Estás viendo como: <strong>{getRoleName(effectiveRole!)}</strong>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetToOriginalRole}
              className="ml-2 border-yellow-500 text-yellow-700"
            >
              Volver a mi rol ({getRoleName(userRole!)})
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`w-64 border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
          isSidebarOpen ? 'block' : 'hidden md:block'
        }`}>
          {renderSidebar()}
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
