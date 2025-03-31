
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvoiceList } from "@/features/payments/components/InvoiceList";
import { useSubscription } from "@/features/payments/hooks/useSubscription";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Billing: React.FC = () => {
  const { subscription, plans, isLoading, cancelSubscription, resumeSubscription } = useSubscription();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: es });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Activa</Badge>;
      case 'canceled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelada</Badge>;
      case 'past_due':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pago pendiente</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Periodo de prueba</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;
    
    if (window.confirm("¿Estás seguro de que deseas cancelar tu suscripción? Seguirás teniendo acceso hasta el final del periodo actual.")) {
      await cancelSubscription();
    }
  };

  const handleResumeSubscription = async () => {
    if (!subscription) return;
    
    await resumeSubscription();
  };

  const renderSubscriptionDetails = () => {
    if (isLoading) {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium">Cargando información de suscripción</h3>
          </CardContent>
        </Card>
      );
    }

    if (!subscription) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Sin suscripción activa</CardTitle>
            <CardDescription>
              Actualmente no tienes ninguna suscripción activa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Suscríbete a un plan para obtener acceso completo a todos nuestros cursos y beneficios exclusivos.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {plans.map(plan => (
                  <Card key={plan.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="text-3xl font-bold mb-4">
                        {new Intl.NumberFormat('es-ES', {
                          style: 'currency',
                          currency: plan.currency.toUpperCase()
                        }).format(plan.price)}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{plan.interval === 'monthly' ? 'mes' : 'año'}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Suscribirme</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    const plan = plans.find(p => p.id === subscription.plan_id);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Detalles de tu suscripción</CardTitle>
            {getStatusBadge(subscription.status)}
          </div>
          <CardDescription>
            Plan: {plan?.name || 'Plan'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Periodo actual</p>
              <p className="font-medium">
                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Precio</p>
              <p className="font-medium">
                {plan ? new Intl.NumberFormat('es-ES', {
                  style: 'currency',
                  currency: plan.currency.toUpperCase()
                }).format(plan.price) : '--'} 
                / {plan?.interval === 'monthly' ? 'mes' : 'año'}
              </p>
            </div>
          </div>

          {subscription.cancel_at_period_end && (
            <Alert variant="warning" className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-800" />
              <AlertTitle>Suscripción cancelada</AlertTitle>
              <AlertDescription>
                Tu suscripción ha sido cancelada y terminará el {formatDate(subscription.current_period_end)}. 
                Hasta entonces seguirás teniendo acceso a todos los beneficios.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {subscription.cancel_at_period_end ? (
            <Button onClick={handleResumeSubscription} variant="default">
              Reanudar suscripción
            </Button>
          ) : (
            <Button onClick={handleCancelSubscription} variant="outline">
              Cancelar suscripción
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Facturación y suscripciones</h1>
      
      <Tabs defaultValue="subscription">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription">Mi suscripción</TabsTrigger>
          <TabsTrigger value="invoices">Facturas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="space-y-4">
          {renderSubscriptionDetails()}
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <InvoiceList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
