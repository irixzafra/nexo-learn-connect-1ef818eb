
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
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    icon: Briefcase,
    label: 'Carreras',
    path: '/careers',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Route,
    label: 'Rutas de aprendizaje',
    path: '/learning-paths',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  },
  {
    icon: Briefcase,
    label: 'Empleo',
    path: '/job-board',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Trophy,
    label: 'Leader Board',
    path: '/leaderboard',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  },
  {
    icon: Users,
    label: 'Grupos',
    path: '/groups',
    disabled: true,
    requiredRole: ['student', 'instructor', 'admin', 'sistemas']
  }
];
