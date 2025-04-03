
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">Bienvenido a Nexo Learning</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Plataforma integral de aprendizaje y desarrollo profesional
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg md-card-elevated p-6">
            <h2 className="text-2xl font-semibold mb-4">Explorar Cursos</h2>
            <p className="mb-4">Descubre nuestra amplia selección de cursos diseñados para potenciar tu desarrollo profesional.</p>
            <Button variant="filled" className="w-full" asChild>
              <Link to="/courses">Ver Cursos</Link>
            </Button>
          </div>
          
          <div className="rounded-lg md-card-elevated p-6">
            <h2 className="text-2xl font-semibold mb-4">Mi Aprendizaje</h2>
            <p className="mb-4">Continúa donde lo dejaste y sigue avanzando en tu camino de aprendizaje.</p>
            <Button variant="filled" className="w-full" asChild>
              <Link to="/dashboard">Mi Dashboard</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button variant="tonal" asChild>
            <Link to="/material-design">Ver Catálogo de Componentes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
