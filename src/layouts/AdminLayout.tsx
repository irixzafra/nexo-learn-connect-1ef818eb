
import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col">
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            {children || <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
