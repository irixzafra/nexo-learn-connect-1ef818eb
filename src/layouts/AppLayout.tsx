
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import AuthenticatedHeader from '@/components/layout/AuthenticatedHeader';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isLoading } = useAuth();
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

  return (
    <div className="flex min-h-screen flex-col">
      <AuthenticatedHeader onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {/* Placeholder para Sidebar */}
        <div className={`w-64 border-r bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
          isSidebarOpen ? 'block' : 'hidden md:block'
        }`}>
          {/* El contenido del Sidebar se implementará más adelante */}
          <div className="p-4">
            <h3 className="font-medium mb-4">Navegación</h3>
            <div className="space-y-1">
              <p className="p-2 text-muted-foreground text-sm rounded-md">
                Sidebar (placeholder)
              </p>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;
