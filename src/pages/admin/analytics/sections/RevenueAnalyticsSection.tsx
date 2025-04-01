
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign } from 'lucide-react';

const RevenueAnalyticsSection: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Analíticas de Ingresos</CardTitle>
          <Badge variant="outline" className="font-normal">En desarrollo</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/40 rounded-md">
          <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Módulo en Desarrollo</h3>
          <p className="text-muted-foreground max-w-md">
            Las analíticas financieras estarán disponibles próximamente.
            Esta sección mostrará datos de ingresos, ventas y suscripciones.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueAnalyticsSection;
