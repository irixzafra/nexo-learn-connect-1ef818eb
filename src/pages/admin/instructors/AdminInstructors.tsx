
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminInstructors: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Instructores",
        description: "Administre los instructores de la plataforma",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar instructores..."
            className="pl-8 w-[300px]"
          />
        </div>
        
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir Instructor
        </Button>
      </div>

      <PageSection
        title="Listado de Instructores"
        description="Instructores activos en la plataforma"
        variant="card"
      >
        <div className="text-center py-8">
          <p className="text-muted-foreground">Funcionalidad en desarrollo</p>
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default AdminInstructors;
