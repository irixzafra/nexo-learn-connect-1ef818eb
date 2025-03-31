
import React from 'react';
import { Invoice } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface InvoiceCardProps {
  invoices: Invoice[];
  downloadInvoice: (invoice: Invoice) => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoices, downloadInvoice }) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'uncollectible':
      case 'void':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagada';
      case 'open':
        return 'Pendiente';
      case 'uncollectible':
        return 'Incobrable';
      case 'void':
        return 'Anulada';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div key={invoice.id} className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold">
                {invoice.course?.title || invoice.subscription?.subscription_plans?.name || 'Factura'}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={getStatusColor(invoice.status)}>
                  {getStatusText(invoice.status)}
                </Badge>
                {invoice.paid_at && (
                  <span className="text-sm text-muted-foreground">
                    Pagado el {format(new Date(invoice.paid_at), 'dd MMM yyyy', { locale: es })}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <span className="font-medium whitespace-nowrap">
                {formatCurrency(invoice.amount, invoice.currency)}
              </span>
              
              <div className="flex gap-2">
                {invoice.invoice_url && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(invoice.invoice_url!, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                )}
                
                {invoice.pdf_url && (
                  <Button 
                    variant="default" 
                    size="sm"
                    onClick={() => downloadInvoice(invoice)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
