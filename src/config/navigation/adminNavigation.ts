
import { NavigationMenus } from '@/types/navigation';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  Settings,
  Shield,
  School,
  FileText,
  HelpCircle,
  Bell,
  MessageSquare,
  FileCode
} from 'lucide-react';

// Admin navigation organized by domains
export const adminNavigation: NavigationMenus = {
  dashboard: [
    {
      label: 'Panel de Control',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    }
  ],
  users: [
    {
      label: 'Usuarios',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Roles y Permisos',
      path: '/admin/roles',
      icon: Shield,
    }
  ],
  education: [
    {
      label: 'Cursos',
      path: '/admin/courses',
      icon: BookOpen,
    },
    {
      label: 'Instructores',
      path: '/admin/instructors',
      icon: School,
    }
  ],
  content: [
    {
      label: 'Páginas',
      path: '/admin/pages',
      icon: FileText,
    },
    {
      label: 'Desarrollo',
      path: '/admin/development',
      icon: FileCode,
    }
  ],
  communications: [
    {
      label: 'Notificaciones',
      path: '/admin/notifications',
      icon: Bell,
      badge: 3
    },
    {
      label: 'Mensajes',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: 5
    }
  ],
  system: [
    {
      label: 'Configuración',
      path: '/admin/settings',
      icon: Settings,
    },
    {
      label: 'Soporte',
      path: '/admin/support',
      icon: HelpCircle,
    }
  ]
};
