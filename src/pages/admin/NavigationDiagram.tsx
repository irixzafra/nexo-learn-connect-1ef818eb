
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, ScanSearch } from 'lucide-react';

const NavigationDiagram: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Diagrama de Navegación</h1>
      <p className="text-muted-foreground mb-6">
        Esta herramienta muestra la estructura de navegación de la aplicación.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5 text-primary" />
              Navegación Principal
            </CardTitle>
            <CardDescription>
              Estructura de navegación para usuarios regulares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-center text-muted-foreground">Diagrama en desarrollo</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanSearch className="h-5 w-5 text-primary" />
              Navegación Administrativa
            </CardTitle>
            <CardDescription>
              Estructura de navegación para administradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-center text-muted-foreground">Diagrama en desarrollo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NavigationDiagram;
