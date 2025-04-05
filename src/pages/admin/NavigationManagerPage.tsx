
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { NavigationManager } from '@/components/admin/navigation/NavigationManager';
import { PageHeader } from '@/components/ui/page-header';

const NavigationManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Gestión de Navegación"
        description="Configura el menú de navegación para cada rol de usuario"
      />
      <div className="mt-6">
        <NavigationManager />
      </div>
    </div>
  );
};

export default NavigationManagerPage;
