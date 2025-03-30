
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

interface CourseContentTabProps {
  course?: any;
}

const CourseContentTab: React.FC<CourseContentTabProps> = ({ course }) => {
  return (
    <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
      <div className="text-center py-10">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Estructura del Curso</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Aquí podrás organizar los módulos y lecciones del curso, configurar recursos y contenido multimedia.
        </p>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Editar contenido
        </Button>
      </div>
    </PageSection>
  );
};

export default CourseContentTab;
