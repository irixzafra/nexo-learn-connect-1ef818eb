
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';

const Unauthorized: React.FC = () => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="w-full max-w-lg">
          <Alert variant="destructive" className="mb-6">
            <ShieldX className="h-5 w-5" />
            <AlertTitle>Acceso no autorizado</AlertTitle>
            <AlertDescription>
              No tienes los permisos necesarios para acceder a esta página.
            </AlertDescription>
          </Alert>
          
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Tu cuenta actual no tiene los permisos necesarios para ver este contenido. 
              Si crees que esto es un error, por favor contacta al administrador.
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
    </PublicLayout>
  );
};

export default Unauthorized;
