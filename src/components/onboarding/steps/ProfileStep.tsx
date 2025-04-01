
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const ProfileStep: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Configura tu perfil</h2>
          <p className="text-muted-foreground">
            Personaliza tu perfil para que otros usuarios puedan conocerte mejor.
          </p>
          <div className="py-2">
            <ul className="list-disc pl-5 space-y-2">
              <li>Agrega una foto de perfil profesional</li>
              <li>Completa tu información personal</li>
              <li>Actualiza tus intereses y áreas de especialización</li>
              <li>Configura tus preferencias de notificaciones</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStep;
