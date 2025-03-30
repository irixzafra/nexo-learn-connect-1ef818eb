
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceTable } from './InvoiceTable';
import { Invoice } from '@/types/payment';

interface InvoiceCardProps {
  invoices: Invoice[];
  downloadInvoice: (url: string) => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoices, downloadInvoice }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturas</CardTitle>
        <CardDescription>
          Historial completo de tus facturas por compras y suscripciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InvoiceTable invoices={invoices} downloadInvoice={downloadInvoice} />
      </CardContent>
    </Card>
  );
};
