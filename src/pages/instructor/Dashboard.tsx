
import React from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <SectionPageLayout
      header={{
        title: "Dashboard de Instructor",
        description: "Gestiona tus cursos y estudiantes",
      }}
    >
      <div className="mb-6">
        <Button asChild>
          <Link to="/instructor/courses/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nuevo Curso
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PageSection
          title="Tus Cursos"
          description="Cursos que estás impartiendo actualmente"
          variant="card"
        >
          <div className="text-center py-8">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
            <p className="mt-2 text-muted-foreground">Aún no has creado ningún curso</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/instructor/courses/create">
                Crear mi primer curso
              </Link>
            </Button>
          </div>
        </PageSection>

        <PageSection
          title="Estadísticas"
          description="Resumen de tu actividad como instructor"
          variant="card"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground">Estudiantes</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground">Cursos</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground">Valoración</p>
              <p className="text-2xl font-bold">-</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium text-muted-foreground">Ganancias</p>
              <p className="text-2xl font-bold">€0</p>
            </div>
          </div>
        </PageSection>
      </div>
    </SectionPageLayout>
  );
};

export default Dashboard;
