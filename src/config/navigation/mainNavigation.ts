
import { 
  Home, 
  BookOpen, 
  User, 
  MessageSquare, 
  Bell, 
  Calendar,
  Settings,
  CreditCard,
  Award,
  Lightbulb,
  BarChart,
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú principal de navegación (Mis cursos)
 */
export const mainNavigation: MenuItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/app/home',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    icon: User,
    label: 'Mi Perfil',
    path: '/app/profile',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/app/my-courses',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester'],
    isHighlighted: true
  },
  {
    icon: Award,
    label: 'Certificados',
    path: '/app/certificates',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  },
  {
    icon: Lightbulb,
    label: 'Recomendaciones',
    path: '/app/recommendations',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/app/messages',
    requiredRole: ['student', 'instructor', 'admin', 'moderator']
  },
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/app/calendar',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Settings,
    label: 'Preferencias',
    path: '/app/preferences',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/analytics/personal',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  }
];
