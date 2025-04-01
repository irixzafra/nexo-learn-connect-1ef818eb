
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ScanSearch, 
  Navigation, 
  Navigation2,
  AlertTriangle
} from 'lucide-react';

const NavigationDiagram: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Diagrama de Navegación</h1>
      <p className="text-muted-foreground mb-6">
        Esta herramienta muestra la estructura de navegación de la aplicación.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Menú de Administración Eliminado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 bg-muted rounded-md">
            <div className="flex flex-col items-center gap-2 text-center">
              <Navigation2 className="h-10 w-10 text-primary" />
              <p className="text-muted-foreground">
                El menú de administración ha sido eliminado del sistema
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Si necesitas restaurar la funcionalidad, por favor contacta al equipo de desarrollo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationDiagram;
