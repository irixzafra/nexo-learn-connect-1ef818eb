
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { PageHeader } from '@/components/ui/page-header';
import OrphanPagesReview from '@/components/admin/OrphanPagesReview';

const OrphanReviewPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-4">
        <PageHeader
          title="Revisión de Páginas Huérfanas"
          description="Análisis de páginas sin enlaces entrantes"
        />
        <div className="mt-6">
          <OrphanPagesReview />
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrphanReviewPage;
