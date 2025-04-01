
import { 
  Database, 
  History, 
  LineChart 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de datos para administración
 */
export const adminDataMenuItems: AdminMenuItem[] = [
  {
    icon: Database,
    label: 'Datos de Prueba',
    href: '/admin/test-data',
    description: 'Herramientas para desarrollo'
  },
  {
    icon: History,
    label: 'Auditoría',
    href: '/admin/audit-log',
    description: 'Registros de actividad'
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    href: '/admin/data-analytics',
    description: 'Análisis de datos'
  }
];
