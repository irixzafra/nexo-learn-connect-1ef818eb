
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Search, ExternalLink, RefreshCw, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Payment {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  product_name: string;
  transaction_id: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function PaymentsTab() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // Mock data for payments
  useEffect(() => {
    const mockPayments: Payment[] = Array.from({ length: 20 }, (_, i) => ({
      id: `payment-${i + 1}`,
      user_id: `user-${Math.floor(Math.random() * 10) + 1}`,
      user_name: `Usuario ${Math.floor(Math.random() * 10) + 1}`,
      user_email: `usuario${Math.floor(Math.random() * 10) + 1}@example.com`,
      amount: Math.random() * 500,
      status: ['completed', 'processing', 'failed', 'refunded'][Math.floor(Math.random() * 4)] as any,
      payment_method: ['credit_card', 'paypal', 'bank_transfer'][Math.floor(Math.random() * 3)],
      created_at: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
      product_name: `Curso de ${['Programación', 'Marketing', 'Diseño', 'Fotografía', 'Idiomas'][
        Math.floor(Math.random() * 5)
      ]}`,
      transaction_id: `tx_${Math.random().toString(36).substring(2, 10)}`,
    }));

    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
    setIsLoading(false);
  }, []);

  // Filter payments based on search term and date range
  useEffect(() => {
    const filtered = payments.filter((payment) => {
      const matchesSearch =
        payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.product_name.toLowerCase().includes(searchTerm.toLowerCase());

      const paymentDate = new Date(payment.created_at);
      const matchesDateRange =
        (!dateRange.from || paymentDate >= dateRange.from) &&
        (!dateRange.to || paymentDate <= dateRange.to);

      return matchesSearch && matchesDateRange;
    });

    setFilteredPayments(filtered);
  }, [searchTerm, payments, dateRange]);

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real implementation, you would fetch data from the API
    setTimeout(() => {
      toast({
        title: "Datos actualizados",
        description: "La lista de transacciones ha sido actualizada.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "Exportación iniciada",
      description: "Los datos se están descargando en formato CSV.",
    });
    // In a real implementation, you would generate and download a CSV file
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completado</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Procesando</Badge>;
      case 'failed':
        return <Badge variant="destructive">Fallido</Badge>;
      case 'refunded':
        return <Badge variant="outline">Reembolsado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Tarjeta de crédito';
      case 'paypal':
        return 'PayPal';
      case 'bank_transfer':
        return 'Transferencia bancaria';
      default:
        return method;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transacciones</CardTitle>
          <CardDescription>
            Gestiona todos los pagos y transacciones de la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center flex-1 gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por usuario, email o ID de transacción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {dateRange.from ? format(dateRange.from, 'dd/MM/yyyy') : 'Desde'} -{' '}
                      {dateRange.to ? format(dateRange.to, 'dd/MM/yyyy') : 'Hasta'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        setDateRange({ from: range.from, to: range.to });
                      }
                    }}
                    locale={es}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" onClick={handleRefresh} size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No se encontraron transacciones.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>ID Transacción</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {format(new Date(payment.created_at), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{payment.user_name}</div>
                        <div className="text-xs text-muted-foreground">{payment.user_email}</div>
                      </TableCell>
                      <TableCell>{payment.product_name}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>{getPaymentMethodLabel(payment.payment_method)}</TableCell>
                      <TableCell className="font-mono text-xs">{payment.transaction_id}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Ver usuario</DropdownMenuItem>
                            {payment.status === 'completed' && (
                              <DropdownMenuItem>Procesar reembolso</DropdownMenuItem>
                            )}
                            <DropdownMenuItem>Enviar recibo</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
