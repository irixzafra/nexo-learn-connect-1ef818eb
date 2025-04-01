
import { 
  Trophy,
  LineChart 
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Configuración del menú de gamificación 
 * (Esta sección es un ejemplo y puede expandirse)
 */
export const gamificationNavigation: MenuItem[] = [
  {
    icon: Trophy,
    label: 'Logros',
    path: '/gamification/achievements',
    description: 'Tus logros y medallas',
    requiredRole: 'student',
  },
  {
    icon: LineChart,
    label: 'Progreso',
    path: '/gamification/progress',
    description: 'Tu progreso y estadísticas',
    requiredRole: 'student',
  },
];
