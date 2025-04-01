
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/admin/AdminNavigation';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:block md:w-64 border-r bg-card">
        <div className="p-5 flex-col overflow-y-auto">
          <div className="font-bold text-lg mb-5">Academia LMS</div>
          <AdminNavigation />
        </div>
      </aside>
      
      <main className="flex-1 p-6">
        {children || <Outlet />}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminLayout;
