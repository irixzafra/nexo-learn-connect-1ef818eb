
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
    requiredRole: ['admin']
  },
  {
    icon: ToggleLeft,
    label: 'Funcionalidades',
    path: '/app/admin/settings/features',
    requiredRole: ['admin']
  },
  {
    icon: Palette,
    label: 'Diseño',
    path: '/app/admin/settings/design',
    requiredRole: ['admin']
  },
  {
    icon: Plug,
    label: 'Conexiones',
    path: '/app/admin/settings/integrations',
    requiredRole: ['admin']
  },
  {
    icon: Database,
    label: 'Datos',
    path: '/app/admin/settings/data',
    requiredRole: ['admin']
  },
  {
    icon: FileText,
    label: 'Gestión de Páginas',
    path: '/app/admin/system-pages',
    requiredRole: ['admin']
  },
  {
    icon: BarChart,
    label: 'Analíticas',
    path: '/app/admin/settings/analytics',
    requiredRole: ['admin']
  },
  {
    icon: Shield,
    label: 'Roles y Permisos',
    path: '/app/admin/settings/roles',
    requiredRole: ['admin']
  },
  {
    icon: Navigation,
    label: 'Diagrama de Navegación',
    path: '/app/admin/navigation-diagram',
    requiredRole: ['admin']
  }
];
