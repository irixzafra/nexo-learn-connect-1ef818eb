
import { 
  Home, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Bell, 
  User,
  Calendar,
  Settings,
  CreditCard
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú principal de navegación
 */
export const mainNavigation: MenuItem[] = [
  {
    icon: Home,
    label: 'Inicio',
    path: '/home',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    icon: BookOpen,
    label: 'Explorar Cursos',
    path: '/courses',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/home/my-courses',
    requiredRole: ['student', 'instructor']
  },
  {
    icon: Users,
    label: 'Comunidad',
    path: '/community',
    requiredRole: ['student', 'instructor', 'moderator']
  },
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/messages',
    requiredRole: ['student', 'instructor', 'admin', 'moderator']
  },
  {
    icon: Bell,
    label: 'Notificaciones',
    path: '/notifications',
    requiredRole: ['student', 'instructor', 'admin', 'moderator']
  },
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/calendar',
    requiredRole: ['student', 'instructor']
  },
  {
    icon: CreditCard,
    label: 'Pagos',
    path: '/billing',
    requiredRole: ['student', 'instructor']
  },
  {
    icon: User,
    label: 'Perfil',
    path: '/profile',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: Settings,
    label: 'Configuración',
    path: '/settings',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  }
];
