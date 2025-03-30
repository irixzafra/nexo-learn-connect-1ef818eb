
import React from 'react';
import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RoleManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Roles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground">
            La gestión de roles estará disponible próximamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
