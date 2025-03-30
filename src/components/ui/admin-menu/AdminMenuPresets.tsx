
import React from 'react';
import { AdminMenuItem } from './AdminMenu';
import { 
  Users, 
  BarChart3, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Database, 
  Shield, 
  KeyRound, 
  Clock, 
  School, 
  LineChart,
  AlertCircle,
  CheckCircle,
  History
} from 'lucide-react';

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

export const adminSecurityMenuItems: AdminMenuItem[] = [
  {
    icon: Shield,
    label: 'Control de Acceso',
    href: '/admin/access',
    description: 'Políticas de seguridad'
  },
  {
    icon: KeyRound,
    label: 'Roles y Permisos',
    href: '/admin/roles',
    description: 'Gestión de roles de usuario'
  },
  {
    icon: History,
    label: 'Auditoría',
    href: '/admin/audit-log',
    description: 'Registros de actividad'
  }
];

export const adminEducationMenuItems: AdminMenuItem[] = [
  {
    icon: BookOpen,
    label: 'Cursos',
    href: '/admin/courses',
    description: 'Gestión de cursos'
  },
  {
    icon: School,
    label: 'Instructores',
    href: '/admin/instructors',
    description: 'Gestión de instructores'
  },
  {
    icon: LineChart,
    label: 'Análisis de Aprendizaje',
    href: '/admin/learning-analytics',
    description: 'Estadísticas educativas'
  }
];

export const adminAlertMenuItems: AdminMenuItem[] = [
  {
    icon: AlertCircle,
    label: 'Actualización de Seguridad Pendiente',
    href: '/admin/security-updates',
    description: 'Se recomienda actualizar los módulos de seguridad a la última versión.'
  },
  {
    icon: CheckCircle,
    label: 'Auditoría Completada',
    href: '/admin/audit-log',
    description: 'La auditoría de seguridad mensual ha sido completada. Sin problemas encontrados.'
  }
];

// Menús para mobile
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
