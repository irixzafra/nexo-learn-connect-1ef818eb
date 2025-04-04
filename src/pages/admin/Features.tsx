
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { FeatureManagement } from '@/components/admin/features/FeatureManagement';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center mb-6">
          <PageHeader
            title="Gestión de Características"
            description="Activa o desactiva funcionalidades del sistema"
          />
          <Link to="/app/admin/orphan-review">
            <Button variant="outline" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Revisar páginas huérfanas
            </Button>
          </Link>
        </div>
        
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <FeatureManagement />
        </ErrorBoundary>
      </div>
    </AdminLayout>
  );
};

export default Features;
