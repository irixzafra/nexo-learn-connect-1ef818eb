
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
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Trophy,
    label: 'Ranking',
    path: '/app/gamification/ranking',
    requiredRole: ['student', 'instructor', 'admin']
  },
  {
    icon: Target,
    label: 'Objetivos',
    path: '/app/gamification/goals',
    requiredRole: ['student', 'admin']
  },
  {
    icon: Zap,
    label: 'Puntos',
    path: '/app/gamification/points',
    requiredRole: ['student', 'admin']
  },
  {
    icon: Star,
    label: 'Recompensas',
    path: '/app/gamification/rewards',
    requiredRole: ['student', 'admin']
  }
];
