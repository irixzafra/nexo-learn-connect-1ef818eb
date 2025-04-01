
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const WelcomeStep: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">¡Bienvenido a la plataforma!</h2>
          <p className="text-muted-foreground">
            Estamos emocionados de tenerte aquí. Este tour te guiará por las principales
            características de la plataforma.
          </p>
          <div className="py-4">
            <img 
              src="/assets/welcome-illustration.svg" 
              alt="Bienvenida" 
              className="mx-auto h-32 w-auto"
              onError={(e) => {
                // Fallback if image doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeStep;
