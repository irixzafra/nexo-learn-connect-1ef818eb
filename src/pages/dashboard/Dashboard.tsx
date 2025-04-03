
import React from 'react';
import { useAuth } from '@/contexts/auth';
import AppLayout from '@/layouts/AppLayout';
import RoleDebugger from '@/components/debug/RoleDebugger';

const Dashboard: React.FC = () => {
  const { userRole, effectiveRole } = useAuth();
  
  console.log('Dashboard - Current roles:', { userRole, effectiveRole });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        
        {/* Temporary role debugger during development */}
        <RoleDebugger />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Bienvenido</h2>
            <p>Este es tu panel de control personalizado.</p>
            <p className="mt-2">Tu rol actual es: <strong>{effectiveRole}</strong></p>
          </div>
          
          {/* You can add more dashboard cards here */}
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
