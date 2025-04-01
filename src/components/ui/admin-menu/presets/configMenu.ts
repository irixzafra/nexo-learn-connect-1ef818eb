
import { 
  Settings, 
  Shield, 
  FileText, 
  LineChart 
} from 'lucide-react';
import { AdminMenuItem } from './types';

/**
 * Menú de configuración para administración
 */
export const adminConfigMenuItems: AdminMenuItem[] = [
  {
    icon: Settings,
    label: 'Funcionalidades',
    href: '/admin/settings',
    description: 'Configuración de funciones'
  },
  {
    icon: Shield,
    label: 'Seguridad',
    href: '/admin/settings/security',
    description: 'Configuración de seguridad'
  },
  {
    icon: Settings,
    label: 'Apariencia',
    href: '/admin/settings/appearance',
    description: 'Configuración visual'
  },
  {
    icon: FileText,
    label: 'Páginas',
    href: '/admin/settings/pages',
    description: 'Gestión de páginas'
  },
  {
    icon: LineChart,
    label: 'Analíticas',
    href: '/admin/settings/analytics',
    description: 'Configuración de métricas'
  }
];
