
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
    path: '/admin/students',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: GraduationCap,
    label: 'Profesores',
    path: '/admin/instructors',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: BookOpen,
    label: 'Cursos',
    path: '/admin/courses',
    requiredRole: ['admin', 'sistemas', 'instructor']
  },
  {
    icon: Tag,
    label: 'Categorías',
    path: '/admin/categories',
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    icon: Award,
    label: 'Certificados',
    path: '/admin/certificates',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Route,
    label: 'Rutas de aprendizaje',
    path: '/admin/learning-paths',
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    icon: Activity,
    label: 'Actividad de Alumnos',
    path: '/admin/student-activity',
    requiredRole: ['admin', 'sistemas']
  }
];
