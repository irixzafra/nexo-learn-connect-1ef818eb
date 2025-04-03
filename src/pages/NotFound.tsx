
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Página no encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Button variant="filled" asChild className="md-hover-scale">
        <Link to="/">Volver al inicio</Link>
      </Button>
    </div>
  );
};

export default NotFound;
