
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';

const AccessControl: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Control de Acceso",
        description: "Gestione las políticas de seguridad y acceso al sistema",
      }}
    >
      <PageSection
        title="Políticas de Seguridad"
        description="Configure las políticas de seguridad del sistema"
        variant="card"
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default AccessControl;
