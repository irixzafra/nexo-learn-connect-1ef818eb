
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
    requiredRole: ['admin']
  },
  {
    icon: Receipt,
    label: 'Facturas',
    path: '/app/admin/finance/invoices',
    requiredRole: ['admin']
  },
  {
    icon: Star,
    label: 'Suscripciones',
    path: '/app/admin/finance/subscriptions',
    requiredRole: ['admin']
  },
  {
    icon: Banknote,
    label: 'Bancos',
    path: '/app/admin/finance/banks',
    requiredRole: ['admin']
  },
  {
    icon: TrendingUp,
    label: 'Cash-flow',
    path: '/app/admin/finance/cash-flow',
    requiredRole: ['admin']
  },
  {
    icon: Bell,
    label: 'Alertas',
    path: '/app/admin/finance/alerts',
    requiredRole: ['admin']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/admin/finance/analytics',
    requiredRole: ['admin']
  }
];
