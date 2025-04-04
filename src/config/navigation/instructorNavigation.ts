
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ClipboardList, 
  MessageSquare,
  BarChart3, 
  CheckSquare,
  Video,
  Calendar,
  FileText
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Instructor navigation organized by workflow as specified in NAVIGATION.md
 */
export const instructorNavigation: MenuItem[] = [
  // Dashboard
  {
    icon: LayoutDashboard,
    label: 'Dashboard Instructor',
    path: '/app/instructor/dashboard',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  
  // Course Creation & Management
  {
    icon: BookOpen,
    label: 'Gestión de Cursos',
    path: '/app/instructor/courses',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'course_management',
    submenu: [
      {
        label: 'Mis Cursos',
        path: '/app/instructor/courses',
        icon: BookOpen,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Crear Curso',
        path: '/app/instructor/courses/create',
        icon: FileText,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Contenido',
        path: '/app/instructor/content',
        icon: Video,
        requiredRole: ['instructor', 'admin', 'sistemas']
      }
    ]
  },
  
  // Student Management
  {
    icon: Users,
    label: 'Gestión de Estudiantes',
    path: '/app/instructor/students',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'student_management',
    submenu: [
      {
        label: 'Mis Estudiantes',
        path: '/app/instructor/students',
        icon: Users,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Calificaciones',
        path: '/app/instructor/grades',
        icon: ClipboardList,
        requiredRole: ['instructor', 'admin', 'sistemas']
      }
    ]
  },
  
  // Evaluation & Assignments
  {
    icon: CheckSquare,
    label: 'Evaluación',
    path: '/app/instructor/assignments',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'evaluation',
    submenu: [
      {
        label: 'Tareas',
        path: '/app/instructor/assignments',
        icon: ClipboardList,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Exámenes',
        path: '/app/instructor/exams',
        icon: CheckSquare,
        requiredRole: ['instructor', 'admin', 'sistemas']
      }
    ]
  },
  
  // Communication
  {
    icon: MessageSquare,
    label: 'Comunicación',
    path: '/app/instructor/messages',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'communication',
    submenu: [
      {
        label: 'Mensajes',
        path: '/app/instructor/messages',
        icon: MessageSquare,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Anuncios',
        path: '/app/instructor/announcements',
        icon: MessageSquare,
        requiredRole: ['instructor', 'admin', 'sistemas']
      }
    ]
  },
  
  // Analytics & Insights
  {
    icon: BarChart3,
    label: 'Analíticas',
    path: '/app/instructor/analytics',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'analytics',
    submenu: [
      {
        label: 'Rendimiento',
        path: '/app/instructor/analytics/performance',
        icon: BarChart3,
        requiredRole: ['instructor', 'admin', 'sistemas']
      },
      {
        label: 'Participación',
        path: '/app/instructor/analytics/engagement',
        icon: BarChart3,
        requiredRole: ['instructor', 'admin', 'sistemas']
      }
    ]
  },
  
  // Calendar & Scheduling
  {
    icon: Calendar,
    label: 'Calendario',
    path: '/app/instructor/calendar',
    requiredRole: ['instructor', 'admin', 'sistemas'],
    workflow: 'scheduling'
  }
];
