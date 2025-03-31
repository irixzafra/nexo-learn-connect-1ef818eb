
import React from 'react';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionPlans } from '@/features/payments/components/SubscriptionPlans';
import { ManageSubscription } from '@/features/payments/components/ManageSubscription';
import { PaymentMethodList } from '@/features/payments/components/PaymentMethodList';
import { InvoiceList } from '@/features/payments/components/InvoiceList';
import AdminNavigation from '@/components/admin/AdminNavigation';
import FloatingEditModeToggle from '@/components/admin/FloatingEditModeToggle';

const Billing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <AdminNavigation />
      
      <div className="container mx-auto py-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Facturación</h1>
          <p className="text-muted-foreground">
            Gestiona tus suscripciones, métodos de pago y facturas
          </p>
        </div>

        <Routes>
          <Route path="/" element={<BillingOverview />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/subscriptions" element={<ManageSubscription />} />
          <Route path="/bank" element={<BankTransactions />} />
          <Route path="/alerts" element={<BillingAlerts />} />
        </Routes>
      </div>
      
      <FloatingEditModeToggle />
    </div>
  );
};

// Placeholder components for new routes
const BillingOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <SubscriptionPlans />
      <PaymentMethodList />
    </div>
  );
};

const BankTransactions: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movimientos Bancarios</h2>
      <p>Visualiza y gestiona todos tus movimientos bancarios.</p>
    </div>
  );
};

const BillingAlerts: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alertas de Facturación</h2>
      <p>Configura alertas sobre tu facturación y recibe notificaciones importantes.</p>
    </div>
  );
};

export default Billing;
