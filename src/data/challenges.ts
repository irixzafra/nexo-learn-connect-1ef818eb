
export interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  participants: number;
  endDate: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progressRequired: number;
  badgeUrl: string;
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Maratón de Programación',
    description: 'Completa 5 cursos de programación en 30 días',
    points: 2000,
    participants: 245,
    endDate: '2023-07-15T23:59:59Z',
    category: 'programming',
    difficulty: 'hard',
    progressRequired: 5,
    badgeUrl: 'https://img.icons8.com/fluency/48/code.png'
  },
  {
    id: 2,
    title: 'Desafío de Datos',
    description: 'Resuelve 10 ejercicios de análisis de datos',
    points: 1500,
    participants: 187,
    endDate: '2023-07-10T23:59:59Z',
    category: 'data-science',
    difficulty: 'medium',
    progressRequired: 10,
    badgeUrl: 'https://img.icons8.com/fluency/48/combo-chart.png'
  },
  {
    id: 3,
    title: 'Diseñador Experto',
    description: 'Crea 3 prototipos funcionales en Figma',
    points: 1200,
    participants: 130,
    endDate: '2023-07-20T23:59:59Z',
    category: 'design',
    difficulty: 'medium',
    progressRequired: 3,
    badgeUrl: 'https://img.icons8.com/fluency/48/apple-pencil.png'
  },
  {
    id: 4,
    title: 'Racha de Aprendizaje',
    description: 'Mantén una racha diaria de 14 días',
    points: 1000,
    participants: 520,
    endDate: '2023-08-01T23:59:59Z',
    category: 'general',
    difficulty: 'easy',
    progressRequired: 14,
    badgeUrl: 'https://img.icons8.com/fluency/48/fire-element.png'
  }
];
