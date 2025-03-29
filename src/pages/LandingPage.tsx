
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LandingNav from '@/components/LandingNav';

const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Descubre el <span className="text-primary">ecosistema creativo</span> de Nexo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Aprende y conecta con una comunidad de profesionales creativos. 
            Cursos, recursos y networking para impulsar tu carrera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/home">Ir al panel de control</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/courses">Explorar cursos</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth/register">Crear cuenta</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
