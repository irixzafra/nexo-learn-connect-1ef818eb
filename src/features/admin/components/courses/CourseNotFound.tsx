
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info } from 'lucide-react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';

const CourseNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <SectionPageLayout>
      <PageSection variant="card">
        <div className="flex flex-col items-center justify-center p-6">
          <Info className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Curso no encontrado</h3>
          <p className="text-muted-foreground mb-4">
            El curso que estás buscando no existe o ha sido eliminado.
          </p>
          <Button onClick={() => navigate('/admin/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Cursos
          </Button>
        </div>
      </PageSection>
    </SectionPageLayout>
  );
};

export default CourseNotFound;
