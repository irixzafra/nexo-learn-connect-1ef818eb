
import { Home, LayoutDashboard } from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Dashboard navigation for all authenticated users
 */
export const dashboardNavigation: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/app/dashboard',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: Home,
    label: 'Inicio',
    path: '/app/home',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  }
];
