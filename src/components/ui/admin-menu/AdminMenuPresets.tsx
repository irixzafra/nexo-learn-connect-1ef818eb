
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
  School, 
  LineChart,
  AlertCircle,
  CheckCircle,
  History,
  FileText,
  Folder,
  Route
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
    icon: Route,
    label: 'Rutas de Aprendizaje',
    href: '/admin/learning-paths',
    description: 'Configuración de rutas'
  },
  {
    icon: LineChart,
    label: 'Análisis de Aprendizaje',
    href: '/admin/learning-analytics',
    description: 'Estadísticas educativas'
  }
];

export const adminContentMenuItems: AdminMenuItem[] = [
  {
    icon: Folder,
    label: 'Gestión de Contenido',
    href: '/admin/content',
    description: 'Centro de gestión de contenido'
  },
  {
    icon: FileText,
    label: 'Categorías',
    href: '/admin/content/categories',
    description: 'Gestión de categorías'
  }
];

export const adminFinanceMenuItems: AdminMenuItem[] = [
  {
    icon: CreditCard,
    label: 'Cobros',
    href: '/admin/billing/payments',
    description: 'Gestión de pagos'
  },
  {
    icon: CreditCard,
    label: 'Suscripciones',
    href: '/admin/billing/subscriptions',
    description: 'Gestión de suscripciones'
  },
  {
    icon: LineChart,
    label: 'Analíticas Financieras',
    href: '/admin/billing/analytics',
    description: 'Estadísticas financieras'
  }
];

export const adminDataMenuItems: AdminMenuItem[] = [
  {
    icon: Database,
    label: 'Datos de Prueba',
    href: '/admin/test-data',
    description: 'Herramientas para desarrollo'
  },
  {
    icon: History,
    label: 'Auditoría',
    href: '/admin/audit-log',
    description: 'Registros de actividad'
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    href: '/admin/data-analytics',
    description: 'Análisis de datos'
  }
];

export const adminConfigMenuItems: AdminMenuItem[] = [
  {
    icon: Settings,
    label: 'Funcionalidades',
    href: '/admin/settings',
    description: 'Configuración de funciones'
  },
  {
    icon: Shield,
    label: 'Seguridad',
    href: '/admin/settings/security',
    description: 'Configuración de seguridad'
  },
  {
    icon: Settings,
    label: 'Apariencia',
    href: '/admin/settings/appearance',
    description: 'Configuración visual'
  },
  {
    icon: FileText,
    label: 'Contenido',
    href: '/admin/settings/content',
    description: 'Configuración de contenido'
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    href: '/admin/settings/analytics',
    description: 'Configuración de métricas'
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
