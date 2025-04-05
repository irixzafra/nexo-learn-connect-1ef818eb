
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import { FeaturesTable } from '@/components/features/FeaturesTable';
import { features } from '@/data/features';

const FeatureManagement: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader 
          title="Gestión de Funcionalidades" 
          description="Administra todas las funcionalidades disponibles en el sistema"
        />
        
        <FeaturesTable features={features} />
      </div>
    </AdminLayout>
  );
};

export default FeatureManagement;
