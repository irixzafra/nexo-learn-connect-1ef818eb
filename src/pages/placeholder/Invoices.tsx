
import React from 'react';
import { Receipt, Download, Filter, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const invoices = [
  { id: 'INV-001', date: '15/10/2023', amount: '$129.00', status: 'paid' },
  { id: 'INV-002', date: '28/09/2023', amount: '$79.00', status: 'paid' },
  { id: 'INV-003', date: '05/09/2023', amount: '$249.00', status: 'paid' },
  { id: 'INV-004', date: '12/08/2023', amount: '$99.00', status: 'pending' },
  { id: 'INV-005', date: '30/07/2023', amount: '$149.00', status: 'cancelled' }
];

const Invoices: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Receipt className="h-8 w-8 text-primary" />
            Mis Facturas
          </h1>
          <p className="text-muted-foreground">Historial de compras y pagos realizados</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Historial de Facturas</CardTitle>
          <CardDescription>Visualiza y descarga tus facturas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar factura..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.status === 'paid' ? 'default' : 
                      invoice.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {invoice.status === 'paid' ? 'Pagada' : 
                       invoice.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
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

export default Invoices;
