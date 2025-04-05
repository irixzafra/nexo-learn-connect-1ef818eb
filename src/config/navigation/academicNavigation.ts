
import { 
  Users, 
  GraduationCap, 
  BookOpen,
  Tag,
  Award,
  Route,
  Activity
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de gestión académica
 */
export const academicNavigation: MenuItem[] = [
  {
    icon: Users,
    label: 'Estudiantes',
    path: '/app/admin/students',
    requiredRole: ['admin']
  },
  {
    icon: GraduationCap,
    label: 'Profesores',
    path: '/app/admin/instructors',
    requiredRole: ['admin']
  },
  {
    icon: BookOpen,
    label: 'Cursos',
    path: '/app/admin/courses',
    requiredRole: ['admin', 'instructor']
  },
  {
    icon: Tag,
    label: 'Categorías',
    path: '/app/admin/categories',
    requiredRole: ['admin']
  },
  {
    icon: Award,
    label: 'Certificados',
    path: '/app/admin/certificates',
    requiredRole: ['admin']
  },
  {
    icon: Route,
    label: 'Rutas de aprendizaje',
    path: '/app/admin/learning-paths',
    requiredRole: ['admin']
  },
  {
    icon: Activity,
    label: 'Actividad de Alumnos',
    path: '/app/admin/student-activity',
    requiredRole: ['admin']
  }
];
