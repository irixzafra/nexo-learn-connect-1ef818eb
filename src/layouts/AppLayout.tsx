
import React, { useState } from 'react';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import AuthenticatedHeader from '@/components/layout/AuthenticatedHeader';
import { useAuth } from '@/contexts/auth';
import { Loader, X } from 'lucide-react';
import AdminSidebar from '@/components/layout/sidebars/AdminSidebar';
import InstructorSidebar from '@/components/layout/sidebars/InstructorSidebar';
import StudentSidebar from '@/components/layout/sidebars/StudentSidebar';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isLoading, effectiveRole, isViewingAsOtherRole, resetToOriginalRole, simulatedUserId, userRole } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

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

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
      
      {isViewingAsOtherRole && isAlertVisible && (
        <div className="sticky top-0 z-50 w-full border-b bg-amber-50 dark:bg-amber-950">
          <Alert variant="warning" className="flex items-center justify-between border-0 py-2">
            <AlertDescription className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">Vista simulada{simulatedUserId ? ' de usuario' : ''}:</span>
              <Badge className="bg-amber-500/90 text-white">
                {simulatedUserId ? 'Usuario específico' : getRoleName(effectiveRole || '')}
              </Badge>
              <span> - Visualizando como {getRoleName(effectiveRole || '')}</span>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 text-xs"
                onClick={resetToOriginalRole}
              >
                Volver a mi rol ({getRoleName(userRole || '')})
              </Button>
            </AlertDescription>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
              onClick={() => setIsAlertVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
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
