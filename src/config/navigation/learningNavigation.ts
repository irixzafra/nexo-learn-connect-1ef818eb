
import { 
  BookOpen, 
  Route, 
  CheckSquare,
  FileText
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Learning-related navigation as specified in NAVIGATION.md
 */
export const learningNavigation: MenuItem[] = [
  {
    icon: BookOpen,
    label: 'Mis Cursos',
    path: '/app/my-courses',
    requiredRole: ['student', 'instructor', 'admin', 'moderator'],
    isHighlighted: true
  },
  {
    icon: Route,
    label: 'Rutas de aprendizaje',
    path: '/app/learning-paths',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: CheckSquare,
    label: 'Tareas Pendientes',
    path: '/app/assignments',
    requiredRole: ['student', 'admin']
  },
  {
    icon: FileText,
    label: 'Notas',
    path: '/app/notes',
    requiredRole: ['student', 'admin']
  }
];
