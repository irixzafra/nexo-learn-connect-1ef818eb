
import React from 'react';

export const WelcomeStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">¡Bienvenido a Nexo!</h2>
      <p className="text-muted-foreground">
        Estamos encantados de tenerte aquí. Vamos a mostrarte las características
        principales de la plataforma para que puedas sacar el máximo provecho.
      </p>
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm">Este tutorial te guiará a través de las funcionalidades básicas:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Completar tu perfil</li>
          <li>• Explorar cursos disponibles</li>
          <li>• Navegar por la plataforma</li>
          <li>• Personalizar tu experiencia</li>
        </ul>
      </div>
    </div>
  );
};
