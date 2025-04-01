
import React from 'react';
import { ToggleRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FeatureManagement from '@/components/admin/features/FeatureManagement';

/**
 * Página dedicada a la gestión de funcionalidades del sistema
 */
const Features: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <ToggleRight className="h-8 w-8 text-primary" />
          Funcionalidades del Sistema
        </h1>
        <p className="text-muted-foreground">
          Activa o desactiva las funcionalidades del sistema. Las dependencias se manejan automáticamente.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Funcionalidades</CardTitle>
          <CardDescription>
            Configura qué funcionalidades están disponibles para los usuarios en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureManagement />
        </CardContent>
      </Card>
    </div>
  );
};

export default Features;
