
import { 
  CreditCard, 
  Receipt, 
  Star,
  Banknote,
  TrendingUp,
  Bell,
  BarChart
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de finanzas
 */
export const financeNavigation: MenuItem[] = [
  {
    icon: CreditCard,
    label: 'Finanzas',
    path: '/app/admin/finance',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Receipt,
    label: 'Facturas',
    path: '/app/admin/finance/invoices',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Star,
    label: 'Suscripciones',
    path: '/app/admin/finance/subscriptions',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Banknote,
    label: 'Bancos',
    path: '/app/admin/finance/banks',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: TrendingUp,
    label: 'Cash-flow',
    path: '/app/admin/finance/cash-flow',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Bell,
    label: 'Alertas',
    path: '/app/admin/finance/alerts',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/admin/finance/analytics',
    requiredRole: ['admin', 'sistemas']
  }
];
