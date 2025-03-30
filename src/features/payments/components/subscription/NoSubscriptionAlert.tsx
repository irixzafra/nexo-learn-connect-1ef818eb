
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NoSubscriptionAlert: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No tienes una suscripción activa</AlertTitle>
        <AlertDescription>
          Actualmente no cuentas con ninguna suscripción activa. Explora nuestros planes para acceder a todos los beneficios.
        </AlertDescription>
      </Alert>
      <Button onClick={() => navigate('/billing')}>Ver planes disponibles</Button>
    </div>
  );
};
