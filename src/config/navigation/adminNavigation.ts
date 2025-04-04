
import { MenuItem } from '@/types/navigation';
import { 
  Settings, 
  Users, 
  LayoutGrid, 
  FileText, 
  Flag, 
  Database, 
  Palette,
  DollarSign,
  FlaskConical,
  Map
} from 'lucide-react';

export const adminNavigation: Record<string, MenuItem[]> = {
  main: [
    {
      label: 'Dashboard',
      icon: LayoutGrid,
      path: '/app/admin/dashboard',
      requiredRole: 'admin'
    },
    {
      label: 'Usuarios',
      icon: Users,
      path: '/app/admin/users',
      requiredRole: 'admin'
    },
    {
      label: 'Cursos',
      icon: FileText,
      path: '/app/admin/courses',
      requiredRole: 'admin'
    },
    {
      label: 'Roadmap',
      icon: Map,
      path: '/app/admin/roadmap',
      requiredRole: 'admin',
      isHighlighted: true,
      description: 'Gestión del roadmap del proyecto',
    },
    {
      label: 'Características',
      icon: Flag,
      path: '/app/admin/features',
      requiredRole: 'admin'
    },
    {
      label: 'Finanzas',
      icon: DollarSign,
      path: '/app/admin/finances',
      requiredRole: 'admin'
    },
    {
      label: 'Páginas',
      icon: FileText,
      path: '/app/admin/pages',
      requiredRole: 'admin'
    },
    {
      label: 'Sistema de diseño',
      icon: Palette,
      path: '/app/admin/design-system',
      requiredRole: 'admin',
      description: 'Explorar componentes del sistema de diseño'
    },
    {
      label: 'Ajustes',
      icon: Settings,
      path: '/app/admin/settings',
      requiredRole: 'admin'
    },
    {
      label: 'Datos de prueba',
      icon: FlaskConical,
      path: '/app/admin/test-data',
      requiredRole: 'admin'
    },
    {
      label: 'Configuración',
      icon: Database,
      path: '/app/admin/system-settings',
      requiredRole: 'admin'
    }
  ]
};

export default adminNavigation;
