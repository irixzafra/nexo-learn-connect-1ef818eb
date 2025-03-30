
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Invoice } from '@/types/payment';

interface InvoiceTableProps {
  invoices: Invoice[];
  downloadInvoice: (url: string) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices, downloadInvoice }) => {
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'open':
        return 'outline';
      case 'void':
      case 'uncollectible':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagada';
      case 'open':
        return 'Pendiente';
      case 'void':
        return 'Anulada';
      case 'uncollectible':
        return 'Incobrable';
      case 'draft':
        return 'Borrador';
      default:
        return status;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Importe</TableHead>
          <TableHead className="text-right">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">
              {formatDate(invoice.created_at)}
            </TableCell>
            <TableCell>
              {invoice.course ? (
                `Curso: ${invoice.course.title}`
              ) : invoice.subscription?.subscription_plans ? (
                `Suscripción: ${invoice.subscription.subscription_plans.name}`
              ) : (
                'Factura'
              )}
            </TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(invoice.status)}>
                {getStatusText(invoice.status)}
              </Badge>
            </TableCell>
            <TableCell>
              {formatCurrency(invoice.amount, invoice.currency)}
            </TableCell>
            <TableCell className="text-right">
              {invoice.invoice_url || invoice.pdf_url ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => downloadInvoice(invoice.invoice_url || invoice.pdf_url || '')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
              ) : (
                <span className="text-muted-foreground text-sm">No disponible</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
