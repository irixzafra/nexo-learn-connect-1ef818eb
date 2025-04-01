
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const ExploreCoursesStep: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Explora nuestros cursos</h2>
          <p className="text-muted-foreground">
            Descubre el contenido disponible en la plataforma y comienza tu aprendizaje.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="border rounded-md p-3">
              <h3 className="font-medium">Cursos populares</h3>
              <p className="text-sm text-muted-foreground">Descubre los más valorados</p>
            </div>
            <div className="border rounded-md p-3">
              <h3 className="font-medium">Rutas de aprendizaje</h3>
              <p className="text-sm text-muted-foreground">Secuencias estructuradas</p>
            </div>
            <div className="border rounded-md p-3">
              <h3 className="font-medium">Certificaciones</h3>
              <p className="text-sm text-muted-foreground">Validación de conocimientos</p>
            </div>
            <div className="border rounded-md p-3">
              <h3 className="font-medium">Comunidad</h3>
              <p className="text-sm text-muted-foreground">Conecta con otros estudiantes</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExploreCoursesStep;
