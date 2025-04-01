
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavigation from '../components/admin/AdminNavigation';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <div className="hidden md:flex md:w-64 md:flex-col border-r bg-card">
            <div className="flex flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4 mb-5">
                <span className="font-bold text-lg">Academia LMS</span>
              </div>
              <AdminNavigation />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col">
            <main className="flex-1 p-6">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminLayout;
