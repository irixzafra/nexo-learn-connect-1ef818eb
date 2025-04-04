
import { NavigationMenus } from '@/types/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart2,
  Settings,
  HelpCircle,
  Video,
  FileCheck
} from 'lucide-react';

// Instructor navigation organized by workflows
export const instructorNavigation: NavigationMenus = {
  dashboard: [
    {
      label: 'Panel del Instructor',
      path: '/instructor/dashboard',
      icon: LayoutDashboard,
    }
  ],
  courses: [
    {
      label: 'Mis Cursos',
      path: '/instructor/courses',
      icon: BookOpen,
    },
    {
      label: 'Crear Contenido',
      path: '/instructor/content/create',
      icon: Video,
    },
    {
      label: 'Evaluaciones',
      path: '/instructor/assessments',
      icon: FileCheck,
    }
  ],
  schedule: [
    {
      label: 'Calendario',
      path: '/instructor/calendar',
      icon: Calendar,
    }
  ],
  students: [
    {
      label: 'Estudiantes',
      path: '/instructor/students',
      icon: Users,
    },
    {
      label: 'Mensajes',
      path: '/instructor/messages',
      icon: MessageSquare,
      badge: 3
    }
  ],
  analytics: [
    {
      label: 'Estadísticas',
      path: '/instructor/analytics',
      icon: BarChart2,
    },
    {
      label: 'Informes',
      path: '/instructor/reports',
      icon: FileText,
    }
  ],
  settings: [
    {
      label: 'Configuración',
      path: '/instructor/settings',
      icon: Settings,
    },
    {
      label: 'Ayuda',
      path: '/instructor/help',
      icon: HelpCircle,
    }
  ]
};
