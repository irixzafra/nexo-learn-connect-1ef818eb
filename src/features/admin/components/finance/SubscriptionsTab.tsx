
import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscriptions } from '@/features/admin/hooks/useSubscriptions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function SubscriptionsTab() {
  const {
    subscriptions,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refetch,
    cancelSubscription,
  } = useSubscriptions();
  
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false);
  
  const handleCancelSubscription = async () => {
    if (selectedSubscription) {
      const success = await cancelSubscription(selectedSubscription.id);
      if (success) {
        setIsCancellationDialogOpen(false);
        refetch();
      }
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Activa</Badge>;
      case 'canceled':
        return <Badge variant="outline">Cancelada</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Pago pendiente</Badge>;
      case 'trialing':
        return <Badge variant="secondary">Período de prueba</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatIntervalLabel = (interval: string, price: number) => {
    switch (interval) {
      case 'month':
        return `${formatCurrency(price)}/mes`;
      case 'year':
        return `${formatCurrency(price)}/año`;
      case 'week':
        return `${formatCurrency(price)}/semana`;
      case 'day':
        return `${formatCurrency(price)}/día`;
      default:
        return formatCurrency(price);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Suscripciones</CardTitle>
          <CardDescription>
            Gestiona las suscripciones activas e históricas de usuarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex items-center flex-1 gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    <span>{statusFilter ? `Estado: ${statusFilter}` : 'Todos los estados'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                    Activa
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('canceled')}>
                    Cancelada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('past_due')}>
                    Pago pendiente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('trialing')}>
                    Período de prueba
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={() => refetch()} size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive rounded-md p-4">
              <p className="text-destructive">Error: No se pudieron cargar las suscripciones.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()} 
                className="mt-2"
              >
                Reintentar
              </Button>
            </div>
          ) : subscriptions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No se encontraron suscripciones.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de inicio</TableHead>
                    <TableHead>Próximo cobro</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="font-medium">{subscription.user_full_name}</div>
                        <div className="text-xs text-muted-foreground">{subscription.user_email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{subscription.plan_name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatIntervalLabel(subscription.plan_interval || 'month', subscription.plan_price || 0)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(subscription.current_period_start), 'dd/MM/yyyy', { locale: es })}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {subscription.status === 'canceled' ? (
                          <span className="text-muted-foreground">N/A</span>
                        ) : (
                          format(new Date(subscription.current_period_end), 'dd/MM/yyyy', { locale: es })
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Acciones
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Ver perfil de usuario</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {subscription.status === 'active' && (
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => {
                                  setSelectedSubscription(subscription);
                                  setIsCancellationDialogOpen(true);
                                }}
                              >
                                Cancelar suscripción
                              </DropdownMenuItem>
                            )}
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

      {/* Cancellation Dialog */}
      <AlertDialog open={isCancellationDialogOpen} onOpenChange={setIsCancellationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cancelar suscripción?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de cancelar la suscripción de {selectedSubscription?.user_full_name}.
              La suscripción permanecerá activa hasta el final del período actual, y luego no se renovará.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancelar suscripción
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
