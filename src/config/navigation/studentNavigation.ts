
import { 
  BookOpen, 
  User, 
  Award,
  Calendar,
  Compass
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Student navigation as specified in NAVIGATION.md
 */
export const studentNavigation: MenuItem[] = [
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/app/my-courses',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester'],
    isHighlighted: true
  },
  {
    icon: Compass,
    label: 'Explorar Cursos',
    path: '/app/explore-courses',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    icon: User,
    label: 'Mi Perfil',
    path: '/app/profile',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'beta_tester']
  },
  {
    icon: Award,
    label: 'Certificados',
    path: '/app/certificates',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  },
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/app/calendar',
    requiredRole: ['student', 'instructor', 'admin']
  }
];
