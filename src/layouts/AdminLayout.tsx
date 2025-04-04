
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:block md:w-64 border-r bg-card">
        <div className="p-5 flex-col h-full overflow-y-auto">
          <div className="font-bold text-lg mb-5">Academia LMS</div>
          {/* Navigation now handled by the sidebar component system */}
        </div>
      </aside>
      
      <main className="flex-1 p-6">
        {children}
      </main>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default AdminLayout;
