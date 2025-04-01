
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { FeatureManagement } from '@/components/admin/features/FeatureManagement';

const Features: React.FC = () => {
  return (
    <AdminPageLayout
      title="Gestión de Características"
      subtitle="Activa o desactiva funcionalidades del sistema"
    >
      <FeatureManagement />
    </AdminPageLayout>
  );
};

export default Features;
