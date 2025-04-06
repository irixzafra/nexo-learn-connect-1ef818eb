
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import OrphanPagesReview from '@/components/admin/OrphanPagesReview';

const OrphanReviewPage: React.FC = () => {
  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Revisión de Páginas Huérfanas"
        description="Análisis de páginas sin enlaces entrantes"
      />
      <div className="mt-6">
        <OrphanPagesReview />
      </div>
    </div>
  );
};

export default OrphanReviewPage;
