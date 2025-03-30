
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const UserAnalytics: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analíticas de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground">
            Las analíticas de usuarios estarán disponibles próximamente.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
