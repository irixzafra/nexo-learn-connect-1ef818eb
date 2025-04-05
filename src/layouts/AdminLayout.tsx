
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {
  children?: ReactNode;
}

// This layout is intentionally simplified as it's rendered within AppLayout
// which already provides the sidebar navigation
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="w-full">
      <main className="p-6">
        {children || <Outlet />}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminLayout;
