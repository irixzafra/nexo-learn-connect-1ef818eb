
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, BookOpen } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

const CourseContentTab: React.FC = () => {
  return (
    <PageSection variant="card" title="Contenido del Curso" description="Módulos y lecciones">
      <div className="text-center py-10">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">Editor de Contenido</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Aquí podrás gestionar los módulos y lecciones del curso. Esta funcionalidad está en desarrollo.
        </p>
        <Button variant="outline">
          <Eye className="h-4 w-4 mr-2" />
          Ver estructura actual
        </Button>
      </div>
    </PageSection>
  );
};

export default CourseContentTab;
