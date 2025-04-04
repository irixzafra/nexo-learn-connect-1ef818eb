
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import RoadmapManager from '@/features/admin/components/roadmap/RoadmapManager';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const RoadmapManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Gestor del Roadmap"
        description="Actualiza el estado de las tareas en el roadmap del proyecto"
      />
      
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Actualización del ROADMAP.md</AlertTitle>
        <AlertDescription>
          Los cambios realizados en esta interfaz actualizarán el estado de las tareas en el roadmap.
          Para aplicar estos cambios al archivo ROADMAP.md, utiliza el botón "Generar Actualización" en cada fase.
        </AlertDescription>
      </Alert>
      
      <RoadmapManager />
    </div>
  );
};

export default RoadmapManagerPage;
