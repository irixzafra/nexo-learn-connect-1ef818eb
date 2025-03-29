
import React from 'react';
import AppLayout from '@/layouts/AppLayout';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Bienvenido a Nexo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-4">Mis Cursos</h2>
            <p className="text-muted-foreground mb-4">
              Accede a tus cursos y continúa tu aprendizaje desde donde lo dejaste.
            </p>
            <div className="h-2 w-full bg-muted rounded-full">
              <div className="h-2 w-1/3 bg-primary rounded-full"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">33% completado en total</p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-4">Cursos Recomendados</h2>
            <p className="text-muted-foreground">
              Descubre nuevos cursos basados en tus intereses y aprendizaje previo.
            </p>
            <p className="text-sm text-primary mt-4 cursor-pointer">Ver catálogo completo →</p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6 border">
            <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm">Completaste la lección "Introducción"</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                <div>
                  <p className="text-sm">Te inscribiste en un nuevo curso</p>
                  <p className="text-xs text-muted-foreground">Hace 5 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
