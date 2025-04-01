
import { 
  Settings, 
  ToggleLeft, 
  Palette,
  Plug,
  Database,
  FileText,
  BarChart,
  Shield
} from 'lucide-react';
import { MenuItem } from './types';

/**
 * Menú de configuración
 */
export const settingsNavigation: MenuItem[] = [
  {
    icon: Settings,
    label: 'Configuración General',
    path: '/admin/settings',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: ToggleLeft,
    label: 'Funcionalidades',
    path: '/admin/settings/features',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Palette,
    label: 'Diseño',
    path: '/admin/design',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Plug,
    label: 'Conexiones',
    path: '/admin/settings/integrations',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Database,
    label: 'Datos',
    path: '/admin/settings/data',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: FileText,
    label: 'Páginas',
    path: '/admin/pages',
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/admin/analytics',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Shield,
    label: 'Roles y Permisos',
    path: '/admin/roles',
    requiredRole: ['admin', 'sistemas']
  }
];
