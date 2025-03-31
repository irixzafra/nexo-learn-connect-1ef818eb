
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const InvoiceLoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-medium">Cargando facturas</h3>
        <p className="text-muted-foreground text-center">
          Espera un momento mientras cargamos tus facturas y pagos
        </p>
      </CardContent>
    </Card>
  );
};
