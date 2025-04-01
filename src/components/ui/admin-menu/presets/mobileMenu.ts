
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  School, 
  CreditCard, 
  Folder, 
  Shield, 
  History, 
  Settings 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú para dispositivos móviles
 */
export const adminMobileMenuItems: AdminMenuItem[] = [
  {
    icon: BarChart3,
    label: 'Dashboard',
    href: '/admin/dashboard'
  },
  {
    icon: Users,
    label: 'Usuarios',
    href: '/admin/users'
  },
  {
    icon: BookOpen,
    label: 'Cursos',
    href: '/admin/courses'
  },
  {
    icon: School,
    label: 'Instructores',
    href: '/admin/instructors'
  },
  {
    icon: CreditCard,
    label: 'Pagos',
    href: '/admin/billing'
  },
  {
    icon: Folder,
    label: 'Contenido',
    href: '/admin/content'
  },
  {
    icon: Shield,
    label: 'Acceso',
    href: '/admin/access'
  },
  {
    icon: History,
    label: 'Auditoría',
    href: '/admin/audit-log'
  },
  {
    icon: Settings,
    label: 'Configuración',
    href: '/admin/settings'
  }
];
