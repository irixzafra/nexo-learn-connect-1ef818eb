
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users } from 'lucide-react';

export const CallToAction: React.FC = () => {
  return (
    <div className="mt-16 bg-muted rounded-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">¡Alcanza la cima del Ranking!</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Completa cursos, participa en desafíos y mantén tu racha diaria para ganar puntos y destacar entre los mejores estudiantes.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="default" size="lg">
          <TrendingUp className="h-5 w-5 mr-2" />
          Explorar Cursos
        </Button>
        <Button variant="outline" size="lg">
          <Users className="h-5 w-5 mr-2" />
          Unirse a la Comunidad
        </Button>
      </div>
    </div>
  );
};
