
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import HeaderContent from '@/components/layout/HeaderContent';
import { trackRoleSwitch } from '@/lib/sentry';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface AppLayoutProps {
  children: React.ReactNode;
}

type ViewAsRole = 'current' | UserRole;

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userRole } = useAuth();
  const location = useLocation();

  // Get saved view role from localStorage
  const getSavedViewRole = (): ViewAsRole => {
    try {
      const savedRole = localStorage.getItem('viewAsRole');
      return savedRole ? (savedRole as ViewAsRole) : 'current';
    } catch (e) {
      return 'current';
    }
  };

  const [viewAsRole, setViewAsRole] = useState<ViewAsRole>(getSavedViewRole());

  // Get default sidebar open state from localStorage if available
  const getDefaultSidebarState = () => {
    try {
      const storedState = localStorage.getItem('sidebarOpen');
      return storedState !== null ? JSON.parse(storedState) : window.innerWidth >= 768;
    } catch (e) {
      return window.innerWidth >= 768;
    }
  };

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Save viewAsRole to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('viewAsRole', viewAsRole);
  }, [viewAsRole]);

  // Effect para limpiar el rol de vista si no es admin
  useEffect(() => {
    if (userRole !== 'admin' && viewAsRole !== 'current') {
      console.log('Usuario no es admin, reseteando vista a rol actual');
      setViewAsRole('current');
      toast.info('Vista de rol restablecida', {
        description: 'Solo los administradores pueden ver como otros roles'
      });
    }
  }, [userRole, viewAsRole]);

  const getEffectiveRole = () => {
    if (viewAsRole === 'current') return userRole;
    return viewAsRole;
  };

  const effectiveRole = getEffectiveRole();

  const handleRoleChange = (role: UserRole) => {
    if (userRole === 'admin') {
      if (userRole) {
        trackRoleSwitch(userRole, role);
      }
      setViewAsRole(role as ViewAsRole);
    } else {
      toast.error('Permiso denegado', {
        description: 'Solo los administradores pueden cambiar vistas de roles'
      });
    }
  };

  return (
    <SidebarProvider defaultOpen={getDefaultSidebarState()}>
      <div className="flex min-h-screen w-full bg-muted/10">
        <AppSidebar 
          viewAsRole={viewAsRole}
          onRoleChange={handleRoleChange}
        />
        
        <div className="flex-1 min-w-0 overflow-auto transition-all duration-300">
          <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b">
            <HeaderContent userRole={userRole} viewingAs={viewAsRole !== 'current' ? viewAsRole : null} />
          </header>
          
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
