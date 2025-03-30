
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const InvoiceEmptyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-10">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No tienes facturas</h3>
        <p className="text-muted-foreground text-center">
          Las facturas de tus compras y suscripciones aparecerán aquí.
        </p>
      </CardContent>
    </Card>
  );
};
