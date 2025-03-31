
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

const FeatureDisabledPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-lg">
        <Alert variant="destructive" className="mb-6">
          <ShieldX className="h-5 w-5" />
          <AlertTitle>Funcionalidad no disponible</AlertTitle>
          <AlertDescription>
            Esta característica no está disponible actualmente.
          </AlertDescription>
        </Alert>
        
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Lo sentimos, la funcionalidad que intentas acceder está desactivada en este momento. 
            Si crees que esto es un error, por favor contacta al administrador del sistema.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/home">
              <Button variant="default">Ir al inicio</Button>
            </Link>
            <Link to="/">
              <Button variant="outline">Volver a la página principal</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDisabledPage;
