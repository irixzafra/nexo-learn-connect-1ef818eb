
import React from 'react';
import { useInvoices } from '@/features/payments/hooks/useInvoices';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileText, Download } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export const InvoiceList: React.FC = () => {
  const { invoices, isLoading, downloadInvoice } = useInvoices();

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default'; // Changed from 'success' to 'default'
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (invoices.length === 0) {
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
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Historial de Facturas</h2>
        <p className="text-muted-foreground">Consulta y descarga tus facturas</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Facturas</CardTitle>
          <CardDescription>
            Historial completo de tus facturas por compras y suscripciones
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
};
