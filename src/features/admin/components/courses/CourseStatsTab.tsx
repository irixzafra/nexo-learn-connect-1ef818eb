
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

const CourseStatsTab: React.FC = () => {
  return (
    <PageSection variant="card" title="Estadísticas del Curso" description="Métricas de rendimiento">
      <div className="text-center py-10">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Estadísticas y Análisis</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Visualiza métricas sobre el rendimiento del curso, inscripciones y progreso de estudiantes. Esta funcionalidad está en desarrollo.
        </p>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Ver informes
        </Button>
      </div>
    </PageSection>
  );
};

export default CourseStatsTab;
