
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
    path: '/admin/finance',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Receipt,
    label: 'Facturas',
    path: '/admin/finance/invoices',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Star,
    label: 'Suscripciones',
    path: '/admin/finance/subscriptions',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Banknote,
    label: 'Bancos',
    path: '/admin/finance/banks',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: TrendingUp,
    label: 'Cash-flow',
    path: '/admin/finance/cash-flow',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Bell,
    label: 'Alertas',
    path: '/admin/finance/alerts',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/admin/finance/analytics',
    requiredRole: ['admin', 'sistemas']
  }
];
