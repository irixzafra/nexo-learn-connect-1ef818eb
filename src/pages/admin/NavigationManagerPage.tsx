
import React from 'react';
import { NavigationManager } from '@/components/admin/navigation/NavigationManager';
import { PageHeader } from '@/components/ui/page-header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { routeMap } from '@/utils/routeUtils';

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
