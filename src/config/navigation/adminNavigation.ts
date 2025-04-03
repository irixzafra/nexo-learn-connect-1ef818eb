
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  LineChart, 
  DollarSign, 
  FileText,
  List,
  Palette,
  CreditCard,
  ClipboardX
} from 'lucide-react';
import { MenuItem } from '@/types/navigation';

export const adminNavigation: MenuItem[] = [
  {
    label: 'Dashboard',
    path: '/app/admin/dashboard',
    icon: LayoutDashboard,
    requiredRole: ['admin', 'sistemas']
  },
  {
    label: 'Usuarios',
    path: '/app/admin/users',
    icon: Users,
    requiredRole: ['admin', 'sistemas', 'support']
  },
  {
    label: 'Cursos',
    path: '/app/admin/courses',
    icon: BookOpen,
    requiredRole: ['admin', 'sistemas', 'content_manager']
  },
  {
    label: 'Analíticas',
    path: '/app/admin/analytics',
    icon: BarChart3,
    requiredRole: ['admin', 'sistemas', 'analytics'],
    submenu: [
      {
        label: 'Usuarios',
        path: '/app/admin/analytics/users',
        icon: LineChart,
        requiredRole: ['admin', 'sistemas', 'analytics']
      },
      {
        label: 'Cursos',
        path: '/app/admin/analytics/courses',
        icon: BookOpen,
        requiredRole: ['admin', 'sistemas', 'analytics']
      },
      {
        label: 'Ingresos',
        path: '/app/admin/analytics/revenue',
        icon: DollarSign,
        requiredRole: ['admin', 'sistemas', 'analytics']
      }
    ]
  },
  {
    label: 'Pagos',
    path: '/app/admin/payments',
    icon: CreditCard,
    requiredRole: ['admin', 'sistemas', 'finance']
  },
  {
    label: 'Páginas',
    path: '/app/admin/system-pages',
    icon: FileText,
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    label: 'Sistema de Diseño',
    path: '/app/admin/design-system',
    icon: Palette,
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    label: 'Diagrama de Navegación',
    path: '/app/admin/navigation-diagram',
    icon: List,
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    label: 'Revisión Componentes',
    path: '/app/admin/review-elements',
    icon: ClipboardX,
    requiredRole: ['admin', 'sistemas', 'content_creator']
  },
  {
    label: 'Configuraciones',
    path: '/app/admin/settings',
    icon: Settings,
    requiredRole: ['admin', 'sistemas']
  },
];
