
import { 
  Settings, 
  UserCog,
  Bell,
  Lock,
  CreditCard
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Configuration and settings navigation as specified in NAVIGATION.md
 */
export const configurationNavigation: MenuItem[] = [
  {
    icon: Settings,
    label: 'Preferencias',
    path: '/app/preferences',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: UserCog,
    label: 'Cuenta',
    path: '/app/account',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: Bell,
    label: 'Notificaciones',
    path: '/app/notification-settings',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator']
  },
  {
    icon: Lock,
    label: 'Privacidad',
    path: '/app/privacy',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: CreditCard,
    label: 'Pagos',
    path: '/app/payments',
    requiredRole: ['student', 'instructor', 'admin']
  }
];
