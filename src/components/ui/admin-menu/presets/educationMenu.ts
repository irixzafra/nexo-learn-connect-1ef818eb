
import { 
  BookOpen, 
  School, 
  Route, 
  LineChart 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de educación para administración
 */
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
