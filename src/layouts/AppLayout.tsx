
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Toaster } from 'sonner';

interface AppLayoutProps {
  children?: ReactNode;
  showHeader?: boolean;
  showAdminNavigation?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showHeader = true,
  showAdminNavigation = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <SiteHeader />}
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <SiteFooter />
      <Toaster position="top-right" />
    </div>
  );
};

export default AppLayout;
