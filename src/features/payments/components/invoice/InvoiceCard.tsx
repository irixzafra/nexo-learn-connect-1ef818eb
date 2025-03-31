
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { formatDate } from '@/lib/formatters';

export interface InvoiceProps {
  id: string;
  invoiceNumber?: string;
  amount: number;
  currency: 'eur' | 'usd';
  status: 'paid' | 'pending' | 'failed';
  date: string;
  courseName?: string;
  pdfUrl?: string;
  invoiceUrl?: string;
}

export const InvoiceCard: React.FC<InvoiceProps> = ({
  id,
  invoiceNumber,
  amount,
  currency,
  status,
  date,
  courseName,
  pdfUrl,
  invoiceUrl,
}) => {
  const statusColors = {
    paid: 'text-green-600 bg-green-50',
    pending: 'text-amber-600 bg-amber-50',
    failed: 'text-red-600 bg-red-50',
  };

  const statusText = {
    paid: 'Pagado',
    pending: 'Pendiente',
    failed: 'Fallido',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{invoiceNumber || `Factura ${id.slice(0, 8)}`}</CardTitle>
            <CardDescription>{courseName && `Curso: ${courseName}`}</CardDescription>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusText[status]}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Fecha</p>
            <p className="font-medium">{formatDate(date)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Importe</p>
            <p className="font-medium">{formatCurrency(amount, currency)}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-2">
        {pdfUrl && (
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            PDF
          </Button>
        )}
        {invoiceUrl && (
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Ver factura
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
