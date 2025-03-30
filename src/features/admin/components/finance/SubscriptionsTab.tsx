
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
import { useSubscriptions, Subscription } from '../../hooks/useSubscriptions';
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MoreHorizontal,
  EyeIcon,
  XCircle,
  RotateCcw,
  CreditCard
} from 'lucide-react';
import { format } from 'date-fns';

export function SubscriptionsTab() {
  const {
    subscriptions,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    cancelSubscription
  } = useSubscriptions();

  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsDetailsOpen(true);
  };

  const handleCancelClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedSubscription) return;
    
    const success = await cancelSubscription(selectedSubscription.id);
    if (success) {
      setIsCancelDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Activa</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Cancelada</Badge>;
      case 'trialing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Prueba</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Pendiente de Pago</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatSubscriptionPeriod = (subscription: Subscription) => {
    if (!subscription.current_period_start || !subscription.current_period_end) {
      return 'N/A';
    }
    
    const startDate = format(new Date(subscription.current_period_start), 'dd/MM/yyyy');
    const endDate = format(new Date(subscription.current_period_end), 'dd/MM/yyyy');
    
    return `${startDate} - ${endDate}`;
  };

  const formatNextBilling = (subscription: Subscription) => {
    if (!subscription.current_period_end || subscription.status !== 'active' || subscription.cancel_at_period_end) {
      return 'N/A';
    }
    
    return format(new Date(subscription.current_period_end), 'dd/MM/yyyy');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Suscripciones</CardTitle>
          <CardDescription>
            Gestiona las suscripciones activas de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por usuario, email, plan..."
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
                    <SelectItem value="active">Activas</SelectItem>
                    <SelectItem value="canceled">Canceladas</SelectItem>
                    <SelectItem value="trialing">Prueba</SelectItem>
                    <SelectItem value="past_due">Pendientes de Pago</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
              }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Próximo Cobro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No se encontraron suscripciones.
                    </TableCell>
                  </TableRow>
                ) : (
                  subscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell>
                        <div className="font-medium">{subscription.user_full_name}</div>
                        <div className="text-sm text-muted-foreground">{subscription.user_email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{subscription.plan_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(subscription.plan_price || 0)}
                          {subscription.plan_interval === 'monthly' ? '/mes' : '/año'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(subscription.status)}
                        {subscription.cancel_at_period_end && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Cancelada al final del período
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {formatSubscriptionPeriod(subscription)}
                      </TableCell>
                      <TableCell>
                        {formatNextBilling(subscription)}
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
                            <DropdownMenuItem onClick={() => handleViewDetails(subscription)}>
                              <EyeIcon className="mr-2 h-4 w-4" />
                              <span>Ver detalles</span>
                            </DropdownMenuItem>
                            {subscription.status === 'active' && !subscription.cancel_at_period_end && (
                              <DropdownMenuItem onClick={() => handleCancelClick(subscription)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                <span>Cancelar suscripción</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <CreditCard className="mr-2 h-4 w-4" />
                              <span>Ver método de pago</span>
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

      {/* Subscription Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la suscripción</DialogTitle>
            <DialogDescription>
              Información completa sobre esta suscripción
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubscription && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">ID de Suscripción</h4>
                  <p className="text-sm break-all">{selectedSubscription.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Creada</h4>
                  <p className="text-sm">
                    {format(new Date(selectedSubscription.created_at), 'dd/MM/yyyy HH:mm:ss')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Usuario</h4>
                  <p className="text-sm font-medium">{selectedSubscription.user_full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedSubscription.user_email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Estado</h4>
                  <div>{getStatusBadge(selectedSubscription.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Plan</h4>
                  <p className="text-sm font-medium">{selectedSubscription.plan_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(selectedSubscription.plan_price || 0)}
                    {selectedSubscription.plan_interval === 'monthly' ? '/mes' : '/año'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Período actual</h4>
                  <p className="text-sm">{formatSubscriptionPeriod(selectedSubscription)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Próximo cobro</h4>
                  <p className="text-sm">
                    {formatNextBilling(selectedSubscription)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Cancelación al final del período</h4>
                  <p className="text-sm">
                    {selectedSubscription.cancel_at_period_end ? 'Sí' : 'No'}
                  </p>
                </div>
              </div>
              
              {selectedSubscription.stripe_subscription_id && (
                <div>
                  <h4 className="text-sm font-medium mb-1">ID de Stripe</h4>
                  <p className="text-xs font-mono">{selectedSubscription.stripe_subscription_id}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Cerrar
            </Button>
            {selectedSubscription?.status === 'active' && !selectedSubscription.cancel_at_period_end && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  setIsDetailsOpen(false);
                  setIsCancelDialogOpen(true);
                }}
              >
                Cancelar suscripción
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar cancelación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cancelar esta suscripción? El usuario podrá seguir usando el servicio hasta el final del período actual.
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubscription && (
            <div className="py-4">
              <p className="mb-2"><strong>Usuario:</strong> {selectedSubscription.user_full_name}</p>
              <p className="mb-2"><strong>Plan:</strong> {selectedSubscription.plan_name}</p>
              <p className="mb-4"><strong>Fin del período actual:</strong> {' '}
                {selectedSubscription.current_period_end ? 
                  format(new Date(selectedSubscription.current_period_end), 'dd/MM/yyyy') : 'N/A'}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              No, mantener activa
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              Sí, cancelar suscripción
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
