
import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { Toaster } from 'sonner';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="top-right" />
      <FloatingEditModeToggle />
    </div>
  );
};

export default AppLayout;
