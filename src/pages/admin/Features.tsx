
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { FeatureManagement } from '@/components/admin/features/FeatureManagement';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';

const Features: React.FC = () => {
  return (
    <AdminPageLayout
      title="Gestión de Características"
      subtitle="Activa o desactiva funcionalidades del sistema"
    >
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <FeatureManagement />
      </ErrorBoundary>
    </AdminPageLayout>
  );
};

export default Features;
