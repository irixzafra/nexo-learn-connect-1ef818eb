
import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const AdminInstructors: React.FC = () => {
  const actionButtons = (
    <>
      <Button size="sm" variant="outline">Exportar Lista</Button>
      <Button size="sm">
        <PlusCircle className="h-4 w-4 mr-2" />
        Nuevo Instructor
      </Button>
    </>
  );

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Instructores",
        description: "Administra los instructores de la plataforma educativa"
      }}
      actions={actionButtons}
    >
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Contenido de instructores</h2>
        <p className="text-muted-foreground">
          La gestión de instructores te permite administrar quiénes pueden crear
          y publicar cursos en la plataforma.
        </p>
      </div>
    </SectionPageLayout>
  );
};

export default AdminInstructors;
