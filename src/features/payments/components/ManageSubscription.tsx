
import React, { useState } from 'react';
import { useSubscription } from '@/features/payments/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export const ManageSubscription: React.FC = () => {
  const { subscription, isLoading, cancelSubscription, resumeSubscription } = useSubscription();
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCancelSubscription = async () => {
    setIsActionLoading(true);
    try {
      const result = await cancelSubscription();
      if (result.success) {
        toast({
          title: "Suscripción cancelada",
          description: "Tu suscripción se cancelará al final del período actual.",
          variant: "default",
        });
        setDialogOpen(false);
      } else {
        throw new Error("No se pudo cancelar la suscripción");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al cancelar la suscripción",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleResumeSubscription = async () => {
    setIsActionLoading(true);
    try {
      const result = await resumeSubscription();
      if (result.success) {
        toast({
          title: "Suscripción reactivada",
          description: "Tu suscripción ha sido reactivada con éxito.",
          variant: "default",
        });
      } else {
        throw new Error("No se pudo reactivar la suscripción");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al reactivar la suscripción",
        variant: "destructive",
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No tienes una suscripción activa</AlertTitle>
          <AlertDescription>
            Actualmente no cuentas con ninguna suscripción activa. Explora nuestros planes para acceder a todos los beneficios.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate('/billing')}>Ver planes disponibles</Button>
      </div>
    );
  }

  const plan = subscription.subscription_plans;
  if (!plan) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error al cargar la información del plan</AlertTitle>
        <AlertDescription>
          No se pudo cargar la información del plan de suscripción. Por favor, intenta de nuevo más tarde.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Administrar Suscripción</h2>
        <p className="text-muted-foreground">Gestiona los detalles de tu suscripción actual</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{plan.name}</span>
            <Badge 
              variant={subscription.status === 'active' ? 'outline' : 'destructive'} 
              className="capitalize"
            >
              {subscription.status === 'active' ? (
                subscription.cancel_at_period_end ? 'Cancelada' : 'Activa'
              ) : subscription.status}
            </Badge>
          </CardTitle>
          <CardDescription>{plan.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Precio</p>
              <p className="text-2xl font-bold">
                {formatCurrency(plan.price, plan.currency)} 
                <span className="text-sm text-muted-foreground font-normal">
                  /{plan.interval === 'monthly' ? 'mes' : 'año'}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Estado</p>
              <div className="flex items-center">
                {subscription.status === 'active' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>
                      {subscription.cancel_at_period_end 
                        ? 'Cancelada (finaliza el ' + formatDate(subscription.current_period_end) + ')'
                        : 'Activa'}
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    <span className="capitalize">{subscription.status}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Fecha de inicio</p>
              <p>{formatDate(subscription.current_period_start)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Próximo pago</p>
              <p>{formatDate(subscription.current_period_end)}</p>
            </div>
          </div>
          
          {subscription.cancel_at_period_end && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Suscripción cancelada</AlertTitle>
              <AlertDescription>
                Tu suscripción ha sido cancelada y finalizará el {formatDate(subscription.current_period_end)}. 
                Puedes reactivarla en cualquier momento antes de esa fecha.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate('/billing')}
          >
            Cambiar plan
          </Button>
          
          {subscription.status === 'active' && (
            subscription.cancel_at_period_end ? (
              <Button 
                onClick={handleResumeSubscription} 
                disabled={isActionLoading}
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : 'Reactivar suscripción'}
              </Button>
            ) : (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Cancelar suscripción</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>¿Estás seguro de que deseas cancelar?</DialogTitle>
                    <DialogDescription>
                      Tu suscripción seguirá activa hasta el final del período actual ({formatDate(subscription.current_period_end)}), 
                      después de lo cual perderás acceso a los beneficios del plan.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                      disabled={isActionLoading}
                    >
                      Volver
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleCancelSubscription}
                      disabled={isActionLoading}
                    >
                      {isActionLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : 'Confirmar cancelación'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
