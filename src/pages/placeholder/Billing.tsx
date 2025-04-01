
import React from 'react';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionPlans } from '@/features/payments/components/SubscriptionPlans';
import { ManageSubscription } from '@/features/payments/components/ManageSubscription';
import { PaymentMethodList } from '@/features/payments/components/PaymentMethodList';
import { InvoiceList } from '@/features/payments/components/InvoiceList';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { 
  FileText, 
  CreditCard, 
  RefreshCw, 
  BellDot, 
  BarChart3 
} from 'lucide-react';
import { AdminSubMenuItem } from '@/components/admin/AdminSubMenu';

const subMenuItems: AdminSubMenuItem[] = [
  {
    id: 'invoices',
    label: 'Facturas',
    path: '/admin/billing/invoices',
    icon: FileText
  },
  {
    id: 'subscriptions',
    label: 'Suscripciones',
    path: '/admin/billing/subscriptions',
    icon: RefreshCw
  },
  {
    id: 'bank',
    label: 'Movimientos Bancarios',
    path: '/admin/billing/bank',
    icon: BarChart3
  },
  {
    id: 'alerts',
    label: 'Alertas',
    path: '/admin/billing/alerts',
    icon: BellDot
  }
];

const Billing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AdminPageLayout 
      title="Facturación"
      subtitle="Gestiona tus suscripciones, métodos de pago y facturas"
      subMenuItems={subMenuItems}
      baseRoute="/admin/billing"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/admin/billing/invoices" replace />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/subscriptions" element={<ManageSubscription />} />
        <Route path="/bank" element={<BankTransactions />} />
        <Route path="/alerts" element={<BillingAlerts />} />
      </Routes>
    </AdminPageLayout>
  );
};

// Placeholder components for new routes
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
