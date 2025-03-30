
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePayments, Payment } from '../../hooks/usePayments';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,

  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger, 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  EyeIcon,
  RotateCcw,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

export function PaymentsTab() {
  const {
    payments,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    initiateRefund
  } = usePayments();

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);

  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  const handleRefundClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsRefundDialogOpen(true);
  };

  const handleRefundConfirm = async () => {
    if (!selectedPayment) return;
    
    const success = await initiateRefund(selectedPayment.id);
    if (success) {
      setIsRefundDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge className="bg-green-500">Completado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Fallido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Cobros</CardTitle>
          <CardDescription>
            Gestiona y visualiza todas las transacciones de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por usuario, email, curso..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select
                value={statusFilter || ''}
                onValueChange={(value) => setStatusFilter(value || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estado</SelectLabel>
                    <SelectItem value="">Todos</SelectItem>
                    <SelectItem value="succeeded">Completados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="failed">Fallidos</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[230px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(dateRange.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Seleccionar fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="icon" onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
                setDateRange({ from: undefined, to: undefined });
              }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No se encontraron transacciones.
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">
                        {payment.id.substring(0, 8)}...
                      </TableCell>
                      <TableCell>
                        {format(new Date(payment.created_at), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{payment.user_full_name}</div>
                        <div className="text-sm text-muted-foreground">{payment.user_email}</div>
                      </TableCell>
                      <TableCell>
                        {payment.course_title || 'N/A'}
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Intl.NumberFormat('es-ES', {
                          style: 'currency',
                          currency: payment.currency.toUpperCase()
                        }).format(payment.amount)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              <span>Ver detalles</span>
                            </DropdownMenuItem>
                            {payment.status === 'succeeded' && (
                              <DropdownMenuItem onClick={() => handleRefundClick(payment)}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                <span>Reembolsar</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Ver factura</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la transacción</DialogTitle>
            <DialogDescription>
              Información completa sobre esta transacción
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">ID de Transacción</h4>
                  <p className="text-sm break-all">{selectedPayment.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Fecha</h4>
                  <p className="text-sm">
                    {format(new Date(selectedPayment.created_at), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Usuario</h4>
                  <p className="text-sm font-medium">{selectedPayment.user_full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedPayment.user_email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Estado</h4>
                  <div>{getStatusBadge(selectedPayment.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Producto</h4>
                  <p className="text-sm">{selectedPayment.course_title || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Monto</h4>
                  <p className="text-lg font-semibold">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: selectedPayment.currency.toUpperCase()
                    }).format(selectedPayment.amount)}
                  </p>
                </div>
              </div>
              
              {selectedPayment.stripe_charge_id && (
                <div>
                  <h4 className="text-sm font-medium mb-1">ID de Stripe</h4>
                  <p className="text-xs font-mono">{selectedPayment.stripe_charge_id}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Cerrar
            </Button>
            {selectedPayment?.status === 'succeeded' && (
              <Button 
                variant="default" 
                onClick={() => {
                  setIsDetailsOpen(false);
                  setIsRefundDialogOpen(true);
                }}
              >
                Reembolsar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Confirmation Dialog */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar reembolso</DialogTitle>
            <DialogDescription>
              Esta acción iniciará un reembolso para esta transacción y no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="py-4">
              <p className="mb-2"><strong>Usuario:</strong> {selectedPayment.user_full_name}</p>
              <p className="mb-2"><strong>Curso:</strong> {selectedPayment.course_title || 'N/A'}</p>
              <p className="mb-4"><strong>Monto a reembolsar:</strong> {' '}
                <span className="font-semibold">
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: selectedPayment.currency.toUpperCase()
                  }).format(selectedPayment.amount)}
                </span>
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRefundDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRefundConfirm}>
              Confirmar reembolso
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
