
import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import RefactoredSidebarNavigation from './sidebar/RefactoredSidebarNavigation';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import RoleSwitcherReturnButton from './RoleSwitcherReturnButton';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userRole, viewAsRole: contextViewAsRole, setViewAsRole } = useAuth();
  
  // View as role state (inicializada desde el contexto)
  const [viewAsRole, setViewAsRoleState] = useState<'current' | UserRoleType>(
    contextViewAsRole || 'current'
  );
  
  // Sincroniza el estado local con el contexto cuando cambia
  useEffect(() => {
    if (contextViewAsRole && contextViewAsRole !== viewAsRole) {
      setViewAsRoleState(contextViewAsRole);
    }
  }, [contextViewAsRole]);
  
  // Handler para cambios de rol
  const handleRoleChange = (role: UserRoleType) => {
    console.log("AppLayout: Role changed to", role);
    setViewAsRoleState(role);
    
    // También actualiza el contexto global
    if (setViewAsRole) {
      setViewAsRole(role);
    }
  };
  
  const effectiveRole = viewAsRole === 'current' 
    ? toUserRoleType(userRole as string) 
    : viewAsRole;
  
  // Determina si estamos viendo como otro rol
  const isViewingAsOtherRole = viewAsRole !== 'current' && effectiveRole !== toUserRoleType(userRole as string);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <RefactoredSidebarNavigation 
          viewAsRole={viewAsRole} 
          onRoleChange={handleRoleChange} 
        />
        <div className="flex flex-col w-full">
          <AppHeader viewAsRole={viewAsRole} />
          <main className="flex-1 p-4 md:p-6">
            {/* Botón de retorno al rol original - solo visible cuando se ve como otro rol */}
            {isViewingAsOtherRole && (
              <div className="max-w-xs mx-auto mb-4">
                <RoleSwitcherReturnButton
                  isViewingAsOtherRole={isViewingAsOtherRole}
                  onRoleChange={handleRoleChange}
                  userRole={toUserRoleType(userRole as string)}
                />
              </div>
            )}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
