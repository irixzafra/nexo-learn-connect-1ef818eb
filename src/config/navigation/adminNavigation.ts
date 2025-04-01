
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Database, 
  History, 
  FileText, 
  Route, 
  LineChart,
  Shield,
  Bell,
  PieChart
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de administración
 */
export const adminNavigation: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/admin/dashboard',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Users,
    label: 'Usuarios',
    path: '/admin/users',
    requiredRole: ['admin', 'sistemas'],
    description: 'Gestión de usuarios y roles del sistema'
  },
  {
    icon: Shield,
    label: 'Roles y Permisos',
    path: '/admin/roles',
    requiredRole: ['admin', 'sistemas'],
    description: 'Configuración de roles y permisos'
  },
  {
    icon: BookOpen,
    label: 'Cursos',
    path: '/admin/courses',
    requiredRole: ['admin', 'instructor', 'sistemas'],
    description: 'Gestión del catálogo de cursos'
  },
  {
    icon: Route,
    label: 'Rutas de Aprendizaje',
    path: '/admin/learning-paths',
    requiredRole: ['admin', 'instructor', 'sistemas'],
    description: 'Gestión de rutas de aprendizaje'
  },
  {
    icon: CreditCard,
    label: 'Facturación',
    path: '/admin/billing',
    requiredRole: ['admin', 'sistemas'],
    description: 'Gestión de pagos y facturación'
  },
  {
    icon: Bell,
    label: 'Alertas',
    path: '/admin/alerts',
    requiredRole: ['admin', 'sistemas'],
    description: 'Gestión de alertas del sistema'
  },
  {
    icon: FileText,
    label: 'Páginas',
    path: '/admin/pages',
    requiredRole: ['admin', 'sistemas', 'content_creator'],
    description: 'Editor y gestión de páginas'
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    path: '/admin/analytics',
    requiredRole: ['admin', 'sistemas'],
    description: 'Estadísticas y análisis'
  },
  {
    icon: PieChart,
    label: 'Reportes',
    path: '/admin/reports',
    requiredRole: ['admin', 'sistemas'],
    description: 'Generación de reportes'
  },
  {
    icon: Database,
    label: 'Datos de Prueba',
    path: '/admin/test-data',
    requiredRole: ['admin', 'sistemas'],
    description: 'Herramientas para desarrollo'
  },
  {
    icon: History,
    label: 'Auditoría',
    path: '/admin/audit-log',
    requiredRole: ['admin', 'sistemas'],
    description: 'Registro de actividades'
  },
  {
    icon: Settings,
    label: 'Configuración',
    path: '/admin/settings',
    requiredRole: ['admin', 'sistemas'],
    description: 'Configuración del sistema'
  }
];
