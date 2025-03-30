
import React, { useState } from 'react';
import { usePaymentMethods } from '@/features/payments/hooks/usePaymentMethods';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useStripeCheckout } from '@/features/payments/hooks/useStripeCheckout';

export const PaymentMethodList: React.FC = () => {
  const { paymentMethods, isLoading, setDefaultPaymentMethod } = usePaymentMethods();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { checkoutSubscription, isLoading: isCheckoutLoading } = useStripeCheckout({
    successUrl: `${window.location.origin}/billing/payment-methods`,
    cancelUrl: `${window.location.origin}/billing/payment-methods`
  });

  const handleAddPaymentMethod = () => {
    // Use the subscription checkout flow but with a special "payment_method_update" plan
    // This is just a placeholder, you'd need to implement the Stripe customer portal for this
    checkoutSubscription('payment_method_update');
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    setIsUpdating(true);
    try {
      const result = await setDefaultPaymentMethod(paymentMethodId);
      if (result.success) {
        toast({
          title: "Método de pago actualizado",
          description: "Se ha establecido como método de pago predeterminado.",
          variant: "default",
        });
      } else {
        throw new Error("No se pudo actualizar el método de pago");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al actualizar el método de pago",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Métodos de Pago</h2>
          <p className="text-muted-foreground">Administra tus tarjetas y métodos de pago</p>
        </div>
        <Button onClick={handleAddPaymentMethod} disabled={isCheckoutLoading}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir método de pago
        </Button>
      </div>
      
      {paymentMethods.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-10">
            <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tienes métodos de pago</h3>
            <p className="text-muted-foreground text-center mb-4">
              Añade un método de pago para realizar compras y gestionar tus suscripciones.
            </p>
            <Button onClick={handleAddPaymentMethod} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir método de pago
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="capitalize">{method.card_brand}</span>
                  {method.is_default && (
                    <Badge variant="outline">Predeterminado</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  •••• •••• •••• {method.card_last4}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Expira: {method.card_exp_month}/{method.card_exp_year}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {!method.is_default && (
                  <Button
                    variant="outline"
                    onClick={() => handleSetDefault(method.id)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Actualizando...
                      </>
                    ) : 'Establecer como predeterminado'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
