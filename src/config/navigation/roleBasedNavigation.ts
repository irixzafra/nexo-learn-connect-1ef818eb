
import { UserRoleType } from '@/types/auth';
import { MenuItem } from '@/types/navigation';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  BookOpen,
  Route,
  Award,
  CheckSquare,
  FileText,
  MessageSquare,
  Bell,
  HelpCircle,
  UserPlus,
  Settings,
  UserCog,
  Lock,
  CreditCard,
  Compass,
  Calendar,
  Database,
  Palette,
  Plug,
  BarChart,
  Shield,
  Navigation,
  ToggleLeft,
  Video,
  ClipboardList,
  BarChart3,
  Briefcase,
  User,
  Trophy,
  Map,
  Flag,
  Lightbulb,
  DollarSign
} from 'lucide-react';

/**
 * Sistema de navegación unificado basado en NAVIGATION.md
 * Esta es la fuente única de verdad para la estructura de navegación.
 */

// ADMINISTRACIÓN (Admin) - Organizada por dominios funcionales
export const adminNavigation = {
  // Dashboard principal admin
  dashboard: [
    {
      icon: LayoutDashboard,
      label: 'Dashboard Admin',
      path: '/app/admin/dashboard',
      requiredRole: ['admin', 'sistemas']
    }
  ],
  
  // 1. Académico (LMS)
  academic: [
    {
      icon: BookOpen,
      label: 'Gestión de cursos',
      path: '/app/admin/courses',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: FileText,
      label: 'Contenido Global',
      path: '/app/admin/content',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Trophy,
      label: 'Categorías',
      path: '/app/admin/categories',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Route,
      label: 'Rutas de Aprendizaje',
      path: '/app/admin/learning-paths',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Award,
      label: 'Certificados',
      path: '/app/admin/certificates',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: BarChart,
      label: 'Analíticas Académicas',
      path: '/app/admin/academic-analytics',
      requiredRole: ['admin', 'sistemas']
    }
  ],
  
  // 2. Gestión Central (ERP)
  management: [
    {
      icon: Users,
      label: 'Gestión de usuarios',
      path: '/app/admin/users',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Shield,
      label: 'Roles y permisos',
      path: '/app/admin/roles',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: BarChart,
      label: 'Analíticas de usuarios',
      path: '/app/admin/user-analytics',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: MessageSquare,
      label: 'Comunicación',
      path: '/app/admin/communication',
      requiredRole: ['admin', 'sistemas']
    }
  ],
  
  // 3. Finanzas
  finances: [
    {
      icon: DollarSign,
      label: 'Transacciones',
      path: '/app/admin/transactions',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: CreditCard,
      label: 'Suscripciones',
      path: '/app/admin/subscriptions',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: BarChart,
      label: 'Analíticas Financieras',
      path: '/app/admin/financial-analytics',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Settings,
      label: 'Configuración de pagos',
      path: '/app/admin/payment-settings',
      requiredRole: ['admin', 'sistemas']
    }
  ],
  
  // 4. Sistema (Plataforma)
  system: [
    {
      icon: Settings,
      label: 'Configuración General',
      path: '/app/admin/settings',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Palette,
      label: 'Diseño',
      path: '/app/admin/settings/design',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: FileText,
      label: 'Páginas CMS',
      path: '/app/admin/system-pages',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Flag,
      label: 'Gestión de Features',
      path: '/app/admin/features',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Plug,
      label: 'Integraciones',
      path: '/app/admin/settings/integrations',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: BarChart,
      label: 'Analíticas de Plataforma',
      path: '/app/admin/platform-analytics',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Database,
      label: 'Salud/Logs',
      path: '/app/admin/health',
      requiredRole: ['admin', 'sistemas']
    }
  ],
  
  // 5. Herramientas Dev (Opcional)
  devTools: [
    {
      icon: Navigation,
      label: 'Diagrama de navegación',
      path: '/app/admin/navigation-diagram',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Palette,
      label: 'Revisión de elementos',
      path: '/app/admin/design-system',
      requiredRole: ['admin', 'sistemas']
    },
    {
      icon: Map,
      label: 'Roadmap',
      path: '/app/admin/roadmap',
      requiredRole: ['admin'],
      isHighlighted: true
    }
  ]
};

// INSTRUCTOR - Organizada por flujo de trabajo natural
export const instructorNavigation = {
  // Dashboard principal instructor
  dashboard: [
    {
      icon: LayoutDashboard,
      label: 'Dashboard Instructor',
      path: '/app/instructor/dashboard',
      requiredRole: ['instructor', 'admin', 'sistemas']
    }
  ],
  
  // 1. Gestión Académica
  academicManagement: [
    {
      icon: BookOpen,
      label: 'Mis Cursos',
      path: '/app/instructor/courses',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: FileText,
      label: 'Crear Curso',
      path: '/app/instructor/courses/create',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: Video,
      label: 'Biblioteca de Contenido',
      path: '/app/instructor/content',
      requiredRole: ['instructor', 'admin', 'sistemas']
    }
  ],
  
  // 2. Estudiantes
  students: [
    {
      icon: Users,
      label: 'Mis Estudiantes',
      path: '/app/instructor/students',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: ClipboardList,
      label: 'Progreso/Notas',
      path: '/app/instructor/grades',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: MessageSquare,
      label: 'Comunicación',
      path: '/app/instructor/messages',
      requiredRole: ['instructor', 'admin', 'sistemas']
    }
  ],
  
  // 3. Rendimiento
  performance: [
    {
      icon: BarChart3,
      label: 'Analíticas de Cursos',
      path: '/app/instructor/analytics',
      requiredRole: ['instructor', 'admin', 'sistemas']
    }
  ],
  
  // 4. Cuenta
  account: [
    {
      icon: User,
      label: 'Mi Perfil',
      path: '/app/profile',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: CreditCard,
      label: 'Mi Facturación',
      path: '/app/instructor/billing',
      requiredRole: ['instructor', 'admin', 'sistemas']
    },
    {
      icon: Settings,
      label: 'Configuración',
      path: '/app/preferences',
      requiredRole: ['instructor', 'admin', 'sistemas']
    }
  ]
};

// ESTUDIANTE - Centrada en la comunidad y experiencia de aprendizaje
export const studentNavigation = {
  // Dashboard principal estudiante
  dashboard: [
    {
      icon: LayoutDashboard,
      label: 'Mi Panel',
      path: '/app/dashboard',
      requiredRole: ['student', 'admin', 'sistemas']
    }
  ],
  
  // 1. Comunidad
  community: [
    {
      icon: Home,
      label: 'Feed',
      path: '/app/home',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Trophy,
      label: 'Leaderboard',
      path: '/app/leaderboard',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: MessageSquare,
      label: 'Mensajes',
      path: '/app/messages',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Bell,
      label: 'Notificaciones',
      path: '/app/notifications',
      requiredRole: ['student', 'admin', 'sistemas']
    }
  ],
  
  // 2. Aprendizaje
  learning: [
    {
      icon: BookOpen,
      label: 'Mis Cursos',
      path: '/app/my-courses',
      requiredRole: ['student', 'admin', 'sistemas'],
      isHighlighted: true
    },
    {
      icon: Compass,
      label: 'Explorar Cursos',
      path: '/app/explore-courses',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Route,
      label: 'Rutas de Aprendizaje',
      path: '/app/learning-paths',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Calendar,
      label: 'Calendario',
      path: '/app/calendar',
      requiredRole: ['student', 'admin', 'sistemas']
    }
  ],
  
  // 3. Mi Cuenta
  myAccount: [
    {
      icon: User,
      label: 'Mi Perfil',
      path: '/app/profile',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Award,
      label: 'Progreso/Certificados',
      path: '/app/certificates',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: CreditCard,
      label: 'Facturación/Inscripciones',
      path: '/app/payments',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: Settings,
      label: 'Configuración',
      path: '/app/preferences',
      requiredRole: ['student', 'admin', 'sistemas']
    }
  ],
  
  // 4. Ayuda
  help: [
    {
      icon: HelpCircle,
      label: 'Centro de Ayuda',
      path: '/app/help',
      requiredRole: ['student', 'admin', 'sistemas']
    },
    {
      icon: MessageSquare,
      label: 'Contactar Soporte',
      path: '/app/support',
      requiredRole: ['student', 'admin', 'sistemas']
    }
  ]
};

/**
 * Obtiene la navegación completa para un rol específico
 * @param role - Rol de usuario
 */
export const getNavigationByRole = (role: UserRoleType): Record<string, MenuItem[]> => {
  switch (role) {
    case 'admin':
      return adminNavigation;
    case 'instructor':
      return instructorNavigation;
    case 'student':
    default:
      return studentNavigation;
  }
};

/**
 * Obtiene la ruta de inicio para un rol específico
 * @param role - Rol de usuario
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/app/admin/dashboard';
    case 'instructor':
      return '/app/instructor/dashboard';
    default:
      return '/app/dashboard';
  }
};

export default {
  adminNavigation,
  instructorNavigation,
  studentNavigation,
  getNavigationByRole,
  getHomePathByRole
};
