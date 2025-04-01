
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const RolesSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Configuración de Roles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Esta página está en desarrollo. Aquí podrás configurar los roles del sistema.
        </p>
      </CardContent>
    </Card>
  );
};

export default RolesSettings;
