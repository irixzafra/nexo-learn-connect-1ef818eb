
import { 
  Home, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Bell, 
  User,
  Phone,
  AppWindow
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Configuración principal del menú de navegación
 * Organizado por secciones y adaptado para todos los roles
 */
export const mainNavigation: MenuItem[] = [
  {
    icon: Home,
    label: 'Inicio',
    path: '/home',
    description: 'Panel principal',
  },
  {
    icon: BookOpen,
    label: 'Explorar Cursos',
    path: '/courses',
    description: 'Catálogo de cursos disponibles',
  },
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/home/my-courses',
    description: 'Cursos en los que estás inscrito',
    requiredRole: 'student',
  },
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/instructor/courses',
    description: 'Cursos que impartes',
    requiredRole: 'instructor',
  },
  {
    icon: Users,
    label: 'Comunidad',
    path: '/community',
    description: 'Conecta con otros estudiantes',
  },
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/messages',
    description: 'Centro de mensajes',
    badge: 3, // Este valor debería venir de un hook
  },
  {
    icon: Bell,
    label: 'Notificaciones',
    path: '/notifications',
    description: 'Centro de notificaciones',
  },
  {
    icon: User,
    label: 'Perfil',
    path: '/profile',
    description: 'Tu perfil de usuario',
  },
  {
    icon: Phone,
    label: 'Contacto',
    path: '/contact',
    description: 'Contacta con nosotros',
  },
  {
    icon: AppWindow,
    label: 'Landing Page',
    path: '/landing',
    description: 'Página principal',
  }
];
