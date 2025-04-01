
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Database, 
  School, 
  Folder 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú principal de administración
 */
export const adminMainMenuItems: AdminMenuItem[] = [
  {
    icon: BarChart3,
    label: 'Dashboard',
    href: '/admin/dashboard',
    description: 'Vista general del sistema'
  },
  {
    icon: Users,
    label: 'Gestionar Usuarios',
    href: '/admin/users',
    description: 'Administrar usuarios y roles'
  },
  {
    icon: BookOpen,
    label: 'Gestionar Cursos',
    href: '/admin/courses',
    description: 'Administrar catálogo de cursos'
  },
  {
    icon: School,
    label: 'Gestionar Instructores',
    href: '/admin/instructors',
    description: 'Administrar instructores'
  },
  {
    icon: CreditCard,
    label: 'Facturación',
    href: '/admin/billing',
    description: 'Gestión de pagos e ingresos'
  },
  {
    icon: Folder,
    label: 'Gestión de Contenido',
    href: '/admin/content',
    description: 'Gestión de categorías y contenido'
  },
  {
    icon: Database,
    label: 'Datos de Prueba',
    href: '/admin/test-data',
    description: 'Herramientas para desarrollo'
  },
  {
    icon: Settings,
    label: 'Configuración del Sistema',
    href: '/admin/settings',
    description: 'Opciones y parámetros del sistema'
  }
];
