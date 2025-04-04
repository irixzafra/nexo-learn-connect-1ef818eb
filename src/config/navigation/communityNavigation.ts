
import { 
  Users, 
  MessageSquare, 
  Bell, 
  HelpCircle,
  UserPlus
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Community-related navigation as specified in NAVIGATION.md
 */
export const communityNavigation: MenuItem[] = [
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/app/messages',
    requiredRole: ['student', 'instructor', 'admin', 'moderator']
  },
  {
    icon: Bell,
    label: 'Notificaciones',
    path: '/app/notifications',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator']
  },
  {
    icon: Users,
    label: 'Comunidad',
    path: '/app/community',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator']
  },
  {
    icon: UserPlus,
    label: 'Contactos',
    path: '/app/contacts',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: HelpCircle,
    label: 'Ayuda',
    path: '/app/support',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  }
];
