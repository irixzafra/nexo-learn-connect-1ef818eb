
import { 
  Home, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Bell, 
  User,
  Settings,
  Shield,
  CreditCard,
  Database,
  FileText,
  Route,
  LineChart,
  LayoutDashboard,
  Palette,
  History,
  School,
  Phone,
  AppWindow,
  Trophy
} from 'lucide-react';
import { UserRoleType } from '@/types/auth';

export interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number | string;
  disabled?: boolean;
  description?: string;
  requiredRole?: UserRoleType | UserRoleType[];
  children?: MenuItem[];
}

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
    icon: School,
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

/**
 * Configuración del menú de gamificación 
 * (Esta sección es un ejemplo y puede expandirse)
 */
export const gamificationNavigation: MenuItem[] = [
  {
    icon: Trophy,
    label: 'Logros',
    path: '/gamification/achievements',
    description: 'Tus logros y medallas',
    requiredRole: 'student',
  },
  {
    icon: LineChart,
    label: 'Progreso',
    path: '/gamification/progress',
    description: 'Tu progreso y estadísticas',
    requiredRole: 'student',
  },
];

/**
 * Filtra ítems de menú según el rol del usuario
 * @param items Lista de ítems de menú
 * @param role Rol del usuario actual
 */
export const filterMenuItemsByRole = (items: MenuItem[], role: UserRoleType): MenuItem[] => {
  return items.filter(item => {
    if (!item.requiredRole) return true;
    
    if (Array.isArray(item.requiredRole)) {
      return item.requiredRole.includes(role);
    } else {
      return item.requiredRole === role;
    }
  });
};

/**
 * Obtiene todos los menús filtrados por rol de usuario
 * @param role Rol del usuario
 */
export const getNavigationByRole = (role: UserRoleType) => {
  return {
    main: filterMenuItemsByRole(mainNavigation, role),
    admin: filterMenuItemsByRole(adminNavigation, role),
    gamification: filterMenuItemsByRole(gamificationNavigation, role)
  };
};

/**
 * Determina la ruta de inicio según el rol
 * @param role Rol del usuario
 */
export const getHomePathByRole = (role: UserRoleType): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'instructor':
      return '/instructor/dashboard';
    case 'student':
    default:
      return '/home';
  }
};
