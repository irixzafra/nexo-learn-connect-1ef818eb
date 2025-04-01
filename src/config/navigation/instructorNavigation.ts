
import { 
  BookOpen, 
  ClipboardList, 
  MessageSquare,
  BarChart
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú para profesores
 */
export const instructorNavigation: MenuItem[] = [
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/instructor/courses',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: ClipboardList,
    label: 'Notas y Tareas',
    path: '/instructor/assignments',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: MessageSquare,
    label: 'Mensajes',
    path: '/instructor/messages',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/instructor/analytics',
    requiredRole: ['instructor', 'admin', 'sistemas']
  }
];
