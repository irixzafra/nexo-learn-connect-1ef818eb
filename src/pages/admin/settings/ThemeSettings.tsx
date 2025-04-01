
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';

const ThemeSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Configuración de Tema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Esta página está en desarrollo. Aquí podrás configurar el tema de la aplicación.
        </p>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
