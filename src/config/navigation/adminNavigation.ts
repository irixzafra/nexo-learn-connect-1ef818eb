
import { 
  LayoutDashboard,
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  CreditCard, 
  ClipboardList,
  Shield,
  Database,
  Globe,
  MessageSquare,
  AlertCircle,
  FileText
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Admin navigation organized by domain as specified in NAVIGATION.md
 */
export const adminNavigation: MenuItem[] = [
  // Platform Control
  {
    icon: Shield,
    label: 'Control de Plataforma',
    path: '/app/admin/platform-control',
    requiredRole: ['admin', 'sistemas'],
    domain: 'platform',
    submenu: [
      {
        label: 'Roles y Permisos',
        path: '/app/admin/roles',
        icon: Shield,
        requiredRole: ['admin', 'sistemas']
      },
      {
        label: 'Configuración General',
        path: '/app/admin/settings',
        icon: Settings,
        requiredRole: ['admin', 'sistemas']
      },
      {
        label: 'Registro de Actividad',
        path: '/app/admin/activity-log',
        icon: ClipboardList,
        requiredRole: ['admin', 'sistemas']
      }
    ]
  },
  
  // User Management
  {
    icon: Users,
    label: 'Gestión de Usuarios',
    path: '/app/admin/users',
    requiredRole: ['admin', 'sistemas', 'support'],
    domain: 'users',
    submenu: [
      {
        label: 'Todos los Usuarios',
        path: '/app/admin/users',
        icon: Users,
        requiredRole: ['admin', 'sistemas', 'support']
      },
      {
        label: 'Estudiantes',
        path: '/app/admin/students',
        icon: Users,
        requiredRole: ['admin', 'sistemas']
      },
      {
        label: 'Instructores',
        path: '/app/admin/instructors',
        icon: Users,
        requiredRole: ['admin', 'sistemas']
      }
    ]
  },
  
  // Educational Content
  {
    icon: BookOpen,
    label: 'Contenido Educativo',
    path: '/app/admin/educational-content',
    requiredRole: ['admin', 'sistemas', 'content_manager'],
    domain: 'content',
    submenu: [
      {
        label: 'Cursos',
        path: '/app/admin/courses',
        icon: BookOpen,
        requiredRole: ['admin', 'sistemas', 'content_manager']
      },
      {
        label: 'Categorías',
        path: '/app/admin/categories',
        icon: ClipboardList,
        requiredRole: ['admin', 'sistemas', 'content_creator']
      },
      {
        label: 'Certificados',
        path: '/app/admin/certificates',
        icon: FileText,
        requiredRole: ['admin', 'sistemas']
      }
    ]
  },
  
  // Analytics
  {
    icon: BarChart3,
    label: 'Analíticas',
    path: '/app/admin/analytics',
    requiredRole: ['admin', 'sistemas', 'analytics'],
    domain: 'analytics',
    submenu: [
      {
        label: 'Dashboard',
        path: '/app/admin/analytics/dashboard',
        icon: LayoutDashboard,
        requiredRole: ['admin', 'sistemas', 'analytics']
      },
      {
        label: 'Usuarios',
        path: '/app/admin/analytics/users',
        icon: Users,
        requiredRole: ['admin', 'sistemas', 'analytics']
      },
      {
        label: 'Cursos',
        path: '/app/admin/analytics/courses',
        icon: BookOpen,
        requiredRole: ['admin', 'sistemas', 'analytics']
      }
    ]
  },
  
  // Financials
  {
    icon: CreditCard,
    label: 'Finanzas',
    path: '/app/admin/finance',
    requiredRole: ['admin', 'sistemas', 'finance'],
    domain: 'finance',
    submenu: [
      {
        label: 'Pagos',
        path: '/app/admin/finance/payments',
        icon: CreditCard,
        requiredRole: ['admin', 'sistemas', 'finance']
      },
      {
        label: 'Facturas',
        path: '/app/admin/finance/invoices',
        icon: FileText,
        requiredRole: ['admin', 'sistemas', 'finance'] 
      },
      {
        label: 'Suscripciones',
        path: '/app/admin/finance/subscriptions',
        icon: ClipboardList,
        requiredRole: ['admin', 'sistemas', 'finance']
      }
    ]
  },
  
  // Content Management
  {
    icon: Globe,
    label: 'Gestión de Contenido',
    path: '/app/admin/content',
    requiredRole: ['admin', 'sistemas', 'content_creator'],
    domain: 'website',
    submenu: [
      {
        label: 'Páginas',
        path: '/app/admin/system-pages',
        icon: FileText,
        requiredRole: ['admin', 'sistemas', 'content_creator']
      },
      {
        label: 'Sistema de Diseño',
        path: '/app/admin/design-system',
        icon: Settings,
        requiredRole: ['admin', 'sistemas', 'content_creator']
      }
    ]
  },
  
  // Communication
  {
    icon: MessageSquare,
    label: 'Comunicación',
    path: '/app/admin/communication',
    requiredRole: ['admin', 'sistemas', 'moderator'],
    domain: 'communication',
    submenu: [
      {
        label: 'Anuncios',
        path: '/app/admin/announcements',
        icon: AlertCircle,
        requiredRole: ['admin', 'sistemas', 'moderator']
      },
      {
        label: 'Notificaciones',
        path: '/app/admin/notifications',
        icon: Bell,
        requiredRole: ['admin', 'sistemas', 'moderator']
      },
      {
        label: 'Mensajería',
        path: '/app/admin/messaging',
        icon: MessageSquare,
        requiredRole: ['admin', 'sistemas', 'moderator']
      }
    ]
  },
  
  // Technical
  {
    icon: Database,
    label: 'Técnico',
    path: '/app/admin/technical',
    requiredRole: ['admin', 'sistemas'],
    domain: 'technical',
    submenu: [
      {
        label: 'API',
        path: '/app/admin/api',
        icon: Database,
        requiredRole: ['admin', 'sistemas']
      },
      {
        label: 'Logs',
        path: '/app/admin/logs',
        icon: ClipboardList,
        requiredRole: ['admin', 'sistemas']
      }
    ]
  }
];

// Import missing icons
import { Bell } from 'lucide-react';
