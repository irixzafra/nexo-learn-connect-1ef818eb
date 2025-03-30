
import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import SidebarNavigation from './SidebarNavigation';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { userRole } = useAuth();
  const location = useLocation();
  
  // View as role state
  const [viewAsRole, setViewAsRole] = useState<'current' | UserRoleType>('current');
  
  // Load the viewAsRole from localStorage on component mount
  useEffect(() => {
    const savedViewRole = localStorage.getItem('viewAsRole');
    if (savedViewRole) {
      setViewAsRole(savedViewRole as UserRoleType);
    }
  }, []);
  
  // Handler for role changes
  const handleRoleChange = (role: UserRoleType) => {
    console.log("AppLayout: Role changed to", role);
    setViewAsRole(role);
    localStorage.setItem('viewAsRole', role);
  };
  
  const effectiveRole = viewAsRole === 'current' 
    ? toUserRoleType(userRole as string) 
    : viewAsRole;
  
  // Log for debugging purposes
  console.log("AppLayout: effectiveRole =", effectiveRole, "userRole =", userRole, "viewAsRole =", viewAsRole);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNavigation 
          viewAsRole={viewAsRole} 
          onRoleChange={handleRoleChange} 
        />
        <div className="flex flex-col w-full">
          <AppHeader viewAsRole={viewAsRole} />
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
