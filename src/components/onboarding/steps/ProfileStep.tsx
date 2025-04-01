
import React from 'react';

export const ProfileStep: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tu Perfil</h2>
      <p className="text-muted-foreground">
        Personaliza tu perfil para aprovechar al máximo la plataforma y conectar con otros usuarios.
      </p>
      <div className="bg-muted/50 p-4 rounded-md">
        <p className="text-sm">Recomendaciones para tu perfil:</p>
        <ul className="mt-2 space-y-1 text-sm">
          <li>• Agrega una foto de perfil profesional</li>
          <li>• Completa tu biografía y habilidades</li>
          <li>• Configura tus preferencias de notificaciones</li>
          <li>• Vincula tus redes sociales</li>
        </ul>
      </div>
    </div>
  );
};
