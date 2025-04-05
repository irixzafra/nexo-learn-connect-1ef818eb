
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PanelLeft, FileText, Settings } from 'lucide-react';

// Este es un componente placeholder hasta que se implemente el gestor de navegación real
const NavigationManager: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Secciones de Navegación</h2>
      <p className="text-muted-foreground">
        Esta funcionalidad está en desarrollo. Pronto podrás gestionar la navegación del sistema aquí según el SSOT definido en NAVIGATION.md.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {['Público', 'Estudiante', 'Instructor', 'Administrador'].map((role) => (
          <Card key={role} className="hover:shadow-md transition-all">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <PanelLeft className="h-5 w-5 text-primary" />
                <h3 className="font-medium">{role}</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Navegación para el rol de {role.toLowerCase()}
              </p>
              <Button variant="outline" className="w-full mt-4" disabled>
                Editar Navegación
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const NavigationManagerPage: React.FC = () => {
  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Gestión de Navegación"
        description="Configura el menú de navegación para cada rol de usuario según el SSOT definido en NAVIGATION.md"
      />
      
      <Alert className="mb-6">
        <AlertDescription>
          Esta herramienta permite gestionar la navegación del sistema de acuerdo con la documentación SSOT. 
          Puedes modificar la visibilidad y el orden de los elementos para cada rol.
          <div className="mt-2">
            <Link to={routeMap.adminNavigationDiagram} className="text-primary hover:underline">
              Ver diagrama de navegación
            </Link>
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="mt-6">
        <NavigationManager />
      </div>
    </div>
  );
};

export default NavigationManagerPage;
