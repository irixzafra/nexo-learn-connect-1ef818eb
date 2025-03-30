
import React from 'react';
import { CreditCard, CreditCardIcon, BarChart3, Users } from 'lucide-react';
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/admin/AdminTabs";
import { PaymentsTab } from '@/features/admin/components/finance/PaymentsTab';
import { SubscriptionsTab } from '@/features/admin/components/finance/SubscriptionsTab';
import { AnalyticsTab } from '@/features/admin/components/finance/AnalyticsTab';

const FinanceManagement: React.FC = () => {
  // Create tabs array for AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'payments',
      label: 'Cobros',
      icon: <CreditCard className="h-4 w-4" />,
      content: <PaymentsTab />
    },
    {
      value: 'subscriptions',
      label: 'Suscripciones',
      icon: <Users className="h-4 w-4" />,
      content: <SubscriptionsTab />
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <AnalyticsTab />
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión Financiera"
      subtitle="Administra los cobros, suscripciones y analíticas financieras de la plataforma"
      tabs={tabs}
      defaultTabValue="payments"
    />
  );
};

export default FinanceManagement;
