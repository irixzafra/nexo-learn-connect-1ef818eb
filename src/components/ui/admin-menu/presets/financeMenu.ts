
import { 
  CreditCard, 
  LineChart 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de finanzas para administración
 */
export const adminFinanceMenuItems: AdminMenuItem[] = [
  {
    icon: CreditCard,
    label: 'Cobros',
    href: '/admin/billing/payments',
    description: 'Gestión de pagos'
  },
  {
    icon: CreditCard,
    label: 'Suscripciones',
    href: '/admin/billing/subscriptions',
    description: 'Gestión de suscripciones'
  },
  {
    icon: LineChart,
    label: 'Analíticas Financieras',
    href: '/admin/billing/analytics',
    description: 'Estadísticas financieras'
  }
];
