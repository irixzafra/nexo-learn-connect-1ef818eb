
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export const PlatformTourStep: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Tour por la plataforma</h2>
          <p className="text-muted-foreground">
            Estas son las secciones principales que encontrarás en nuestra plataforma.
          </p>
          <div className="space-y-3 py-2">
            <div className="flex items-start">
              <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Panel Principal</h3>
                <p className="text-sm text-muted-foreground">Acceso rápido a todas las funciones</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Biblioteca de Contenidos</h3>
                <p className="text-sm text-muted-foreground">Todos los recursos disponibles</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Progreso y Estadísticas</h3>
                <p className="text-sm text-muted-foreground">Seguimiento de tu actividad</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Soporte y Ayuda</h3>
                <p className="text-sm text-muted-foreground">Asistencia cuando la necesites</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformTourStep;
