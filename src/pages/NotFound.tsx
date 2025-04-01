
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="bg-primary/10 p-4 rounded-full inline-block mx-auto">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold">
          Página no encontrada
        </h1>
        
        <p className="text-muted-foreground">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
          
          <Button asChild>
            <Link to="/">Ir al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
