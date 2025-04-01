
import { 
  LayoutDashboard,
  Users, 
  Settings,
  BookOpen,
  Route,
  Palette,
  CreditCard,
  Database,
  History,
  FileText,
  LineChart
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Configuración del menú de administración
 * Solo visible para roles admin e instructor (según permisos)
 */
export const adminNavigation: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Panel Admin',
    path: '/admin/dashboard',
    description: 'Panel de control administrativo',
    requiredRole: ['admin', 'instructor'],
  },
  {
    icon: Users,
    label: 'Usuarios',
    path: '/admin/users',
    description: 'Gestión de usuarios',
    requiredRole: 'admin',
  },
  {
    icon: BookOpen,
    label: 'Cursos',
    path: '/admin/courses',
    description: 'Gestión de cursos',
    requiredRole: ['admin', 'instructor'],
  },
  {
    icon: Route,
    label: 'Rutas de Aprendizaje',
    path: '/admin/learning-paths',
    description: 'Gestión de rutas de aprendizaje',
    requiredRole: ['admin', 'instructor'],
  },
  {
    icon: Palette,
    label: 'Diseño',
    path: '/admin/design',
    description: 'Sistema de diseño',
    requiredRole: 'admin',
  },
  {
    icon: CreditCard,
    label: 'Facturación',
    path: '/admin/billing',
    description: 'Gestión de pagos',
    requiredRole: 'admin',
  },
  {
    icon: Database,
    label: 'Datos de Prueba',
    path: '/admin/test-data',
    description: 'Herramientas para datos de prueba',
    requiredRole: 'admin',
  },
  {
    icon: FileText,
    label: 'Páginas',
    path: '/admin/pages',
    description: 'Gestión de páginas',
    requiredRole: 'admin',
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    path: '/admin/analytics',
    description: 'Análisis de datos',
    requiredRole: 'admin',
  },
  {
    icon: History,
    label: 'Auditoría',
    path: '/admin/audit-log',
    description: 'Registros de actividad',
    requiredRole: 'admin',
  },
  {
    icon: Settings,
    label: 'Configuración',
    path: '/admin/settings',
    description: 'Configuración del sistema',
    requiredRole: 'admin',
  }
];
