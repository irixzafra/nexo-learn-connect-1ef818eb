
import React from 'react';
import { useSubscription } from '@/features/payments/hooks/useSubscription';
import { useStripeCheckout } from '@/features/payments/hooks/useStripeCheckout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

export const SubscriptionPlans: React.FC = () => {
  const { plans, subscription, isLoading } = useSubscription();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { checkoutSubscription, isLoading: isCheckoutLoading } = useStripeCheckout({
    successUrl: `${window.location.origin}/payment/success`,
    cancelUrl: `${window.location.origin}/payment/cancel`
  });

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      navigate('/auth/login', { state: { from: '/billing' } });
      return;
    }
    
    checkoutSubscription(planId);
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
      <div>
        <h2 className="text-2xl font-bold">Planes de Suscripción</h2>
        <p className="text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = subscription?.plan_id === plan.id;
          const isCancelled = isCurrentPlan && subscription?.cancel_at_period_end;
          
          return (
            <Card 
              key={plan.id} 
              className={`border ${isCurrentPlan ? 'border-primary' : ''}`}
            >
              <CardHeader>
                {isCurrentPlan && (
                  <Badge className="self-start mb-2" variant="outline">
                    {isCancelled ? 'Cancelado' : 'Plan Actual'}
                  </Badge>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{formatCurrency(plan.price, plan.currency)}</span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.interval === 'monthly' ? 'mes' : 'año'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features && Array.isArray(plan.features) && plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan ? (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/billing/manage')}
                  >
                    {isCancelled ? 'Reactivar Plan' : 'Administrar Suscripción'}
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={isCheckoutLoading}
                  >
                    {isCheckoutLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      'Suscribirse'
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
