
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare,
  BarChart
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú para instructores
 */
export const instructorNavigation: MenuItem[] = [
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/app/instructor/courses',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: ClipboardList,
    label: 'Notas y Tareas',
    path: '/app/instructor/assignments',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/app/instructor/messages',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/instructor/analytics',
    requiredRole: ['instructor', 'admin', 'sistemas']
  }
];
