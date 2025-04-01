
import { ReactNode } from 'react';

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
  rarity: 'legendary' | 'epic' | 'rare' | 'uncommon';
  unlockedBy: number;
  points: number;
}

// We'll import the icons in the component that uses this data
// rather than storing React nodes directly in the data file
export const ACHIEVEMENT_DATA = [
  {
    id: 1,
    name: 'Maestro del Código',
    description: 'Completar todos los cursos de programación',
    iconType: 'Code',
    iconColor: 'text-indigo-500',
    rarity: 'legendary',
    unlockedBy: 0.02, // 2% de usuarios
    points: 5000
  },
  {
    id: 2,
    name: 'Analista de Datos',
    description: 'Completar todos los cursos de ciencia de datos',
    iconType: 'BarChart2',
    iconColor: 'text-blue-500',
    rarity: 'epic',
    unlockedBy: 0.05, // 5% de usuarios
    points: 3000
  },
  {
    id: 3,
    name: 'Diseñador UI/UX',
    description: 'Completar todos los cursos de diseño',
    iconType: 'Palette',
    iconColor: 'text-pink-500',
    rarity: 'rare',
    unlockedBy: 0.08, // 8% de usuarios
    points: 2500
  },
  {
    id: 4,
    name: 'Experto en Marketing',
    description: 'Completar todos los cursos de marketing digital',
    iconType: 'TrendingUp',
    iconColor: 'text-green-500',
    rarity: 'uncommon',
    unlockedBy: 0.12, // 12% de usuarios
    points: 2000
  },
  {
    id: 5,
    name: 'Maestro de la Ciberseguridad',
    description: 'Completar todos los cursos de seguridad informática',
    iconType: 'Shield',
    iconColor: 'text-red-500',
    rarity: 'rare',
    unlockedBy: 0.07, // 7% de usuarios
    points: 2800
  },
  {
    id: 6,
    name: 'Racha de 100 días',
    description: 'Mantener una racha de aprendizaje de 100 días',
    iconType: 'Flame',
    iconColor: 'text-orange-500',
    rarity: 'epic',
    unlockedBy: 0.04, // 4% de usuarios
    points: 3500
  },
  {
    id: 7,
    name: 'Estudiante Dedicado',
    description: 'Completar 50 cursos en la plataforma',
    iconType: 'GraduationCap',
    iconColor: 'text-indigo-700',
    rarity: 'legendary',
    unlockedBy: 0.01, // 1% de usuarios
    points: 6000
  },
  {
    id: 8,
    name: 'Colaborador Activo',
    description: 'Ayudar a 100 estudiantes en el foro de la comunidad',
    iconType: 'Users',
    iconColor: 'text-green-600',
    rarity: 'uncommon',
    unlockedBy: 0.15, // 15% de usuarios
    points: 1800
  }
];
