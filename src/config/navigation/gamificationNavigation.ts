
import { 
  Award, 
  Trophy, 
  Target, 
  Zap, 
  Star
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de Gamificación
 */
export const gamificationNavigation: MenuItem[] = [
  {
    icon: Award,
    label: 'Logros',
    path: '/gamification/achievements',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Trophy,
    label: 'Ranking',
    path: '/gamification/ranking',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Target,
    label: 'Objetivos',
    path: '/gamification/goals',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Zap,
    label: 'Puntos',
    path: '/gamification/points',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Star,
    label: 'Recompensas',
    path: '/gamification/rewards',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  }
];
