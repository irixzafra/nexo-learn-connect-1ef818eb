
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionPlans } from '@/features/payments/components/SubscriptionPlans';
import { ManageSubscription } from '@/features/payments/components/ManageSubscription';
import { PaymentMethodList } from '@/features/payments/components/PaymentMethodList';
import { InvoiceList } from '@/features/payments/components/InvoiceList';

const Billing: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Facturación</h1>
        <p className="text-muted-foreground">
          Gestiona tus suscripciones, métodos de pago y facturas
        </p>
      </div>

      <Tabs defaultValue="plans">
        <TabsList className="mb-6">
          <TabsTrigger value="plans">Planes</TabsTrigger>
          <TabsTrigger value="subscription">Mi Suscripción</TabsTrigger>
          <TabsTrigger value="payment-methods">Métodos de Pago</TabsTrigger>
          <TabsTrigger value="invoices">Facturas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <SubscriptionPlans />
        </TabsContent>
        
        <TabsContent value="subscription">
          <ManageSubscription />
        </TabsContent>
        
        <TabsContent value="payment-methods">
          <PaymentMethodList />
        </TabsContent>
        
        <TabsContent value="invoices">
          <InvoiceList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Billing;
