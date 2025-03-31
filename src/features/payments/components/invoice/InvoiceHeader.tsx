
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const InvoiceHeader: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold">Mis facturas</CardTitle>
          <CardDescription>
            Historial de pagos y facturas de tus compras y suscripciones
          </CardDescription>
        </div>
        <FileText className="h-8 w-8 text-muted-foreground" />
      </CardHeader>
    </Card>
  );
};
