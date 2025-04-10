
import { 
  Compass, 
  Briefcase, 
  Route, 
  Trophy,
  Users
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de exploración
 */
export const exploreNavigation: MenuItem[] = [
  {
    icon: Compass,
    label: 'Explorar',
    path: '/courses',
    requiredRole: ['student', 'instructor', 'admin', 'moderator', 'guest']
  },
  {
    icon: Briefcase,
    label: 'Carreras',
    path: '/app/careers',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Route,
    label: 'Rutas de aprendizaje',
    path: '/app/learning-paths',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Briefcase,
    label: 'Empleo',
    path: '/app/job-board',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Trophy,
    label: 'Leader Board',
    path: '/app/leaderboard',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Users,
    label: 'Grupos',
    path: '/app/groups',
    disabled: true,
    requiredRole: ['student', 'instructor', 'admin']
  }
];
