
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
    path: '/app/gamification/achievements',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Trophy,
    label: 'Ranking',
    path: '/app/gamification/ranking',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Target,
    label: 'Objetivos',
    path: '/app/gamification/goals',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Zap,
    label: 'Puntos',
    path: '/app/gamification/points',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  },
  {
    icon: Star,
    label: 'Recompensas',
    path: '/app/gamification/rewards',
    requiredRole: ['student', 'admin', 'sistemas', 'beta_tester']
  }
];
