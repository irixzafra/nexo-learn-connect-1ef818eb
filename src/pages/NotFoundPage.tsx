
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center p-4">
      <div className="space-y-4">
        <div className="text-9xl font-bold text-primary">404</div>
        <h1 className="text-4xl font-bold tracking-tight">Página no encontrada</h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Lo sentimos, no hemos podido encontrar la página que estás buscando.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver atrás
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Buscas alguna página en particular?
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar en la plataforma..."
              className="w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
