
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface InvoiceProps {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  currency: 'usd' | 'eur';
  status: 'paid' | 'pending' | 'failed';
  courseName: string;
  pdfUrl?: string;
  invoiceUrl?: string;
}

interface InvoiceCardProps extends InvoiceProps {
  onDownload?: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
  invoiceNumber,
  date,
  amount,
  currency,
  status,
  courseName,
  pdfUrl,
  invoiceUrl,
  onDownload
}) => {
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagada';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallida';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{invoiceNumber}</span>
        </div>
        <Badge className={getStatusColor(status)}>{getStatusText(status)}</Badge>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Fecha</span>
            <span className="text-sm font-medium">{formattedDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Concepto</span>
            <span className="text-sm font-medium">{courseName}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Importe</span>
            <span className="text-sm font-medium">{formatCurrency(amount, currency)}</span>
          </div>
          
          <div className="flex justify-end mt-4 gap-2">
            {invoiceUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={invoiceUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </a>
              </Button>
            )}
            
            {(pdfUrl || onDownload) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDownload}
                {...(pdfUrl && !onDownload ? { asChild: true } : {})}
              >
                {pdfUrl && !onDownload ? (
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </a>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-1" />
                    Descargar
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
