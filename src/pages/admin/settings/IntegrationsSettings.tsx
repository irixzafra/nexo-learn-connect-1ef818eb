
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const IntegrationsSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Configuración de Integraciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Esta página está en desarrollo. Aquí podrás configurar las integraciones del sistema.
        </p>
      </CardContent>
    </Card>
  );
};

export default IntegrationsSettings;
