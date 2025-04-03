
import { 
  Settings, 
  ToggleLeft, 
  Palette,
  Plug,
  Database,
  FileText,
  BarChart,
  Shield,
  Navigation
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

/**
 * Menú de configuración
 */
export const settingsNavigation: MenuItem[] = [
  {
    icon: Settings,
    label: 'Configuración General',
    path: '/app/admin/settings',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: ToggleLeft,
    label: 'Funcionalidades',
    path: '/app/admin/settings/features',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Palette,
    label: 'Diseño',
    path: '/app/admin/settings/design',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Plug,
    label: 'Conexiones',
    path: '/app/admin/settings/integrations',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Database,
    label: 'Datos',
    path: '/app/admin/settings/data',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: FileText,
    label: 'Páginas',
    path: '/app/admin/settings/pages',
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/admin/settings/analytics',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Shield,
    label: 'Roles y Permisos',
    path: '/app/admin/settings/roles',
    requiredRole: ['admin', 'sistemas']
  },
  {
    icon: Navigation,
    label: 'Diagrama de Navegación',
    path: '/app/admin/navigation-diagram',
    requiredRole: ['admin', 'sistemas', 'content_creator']
  }
];
