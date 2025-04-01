
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard,
  Settings,
  FileText,
  Palette,
  LineChart,
  BarChart3,
  Activity,
  DollarSign,
  TrendingUp,
  Users2,
  ShieldCheck,
  Plug,
  DatabaseZap,
  Bell,
  BanknoteIcon,
  Receipt
} from 'lucide-react';
import AdminSubMenu, { AdminSubMenuItem } from './AdminSubMenu';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { FeaturesConfig } from '@/contexts/features/types';

// Main navigation categories
const getAllAdminCategories = (designFeatureEnabled: boolean) => [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/admin/dashboard",
    dataTag: "admin-nav-dashboard",
    hidden: false
  },
  { 
    id: 'users',
    icon: Users, 
    label: "Usuarios", 
    path: "/admin/users",
    dataTag: "admin-nav-users",
    hidden: false
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
    dataTag: "admin-nav-courses",
    hidden: false
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/billing",
    dataTag: "admin-nav-finances",
    hidden: false
  },
  { 
    id: 'design',
    icon: Palette,
    label: "Diseño",
    path: "/admin/design",
    dataTag: "admin-nav-design",
    hidden: !designFeatureEnabled
  },
  { 
    id: 'pages',
    icon: FileText,
    label: "Páginas",
    path: "/admin/pages",
    dataTag: "admin-nav-pages",
    hidden: false
  },
  { 
    id: 'analytics',
    icon: LineChart,
    label: "Analíticas",
    path: "/admin/analytics",
    dataTag: "admin-nav-analytics",
    hidden: false
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
    dataTag: "admin-nav-settings",
    hidden: false
  }
];

// Sub-navigation menus for each section
const getSubMenus = (designFeatureEnabled: boolean): Record<string, AdminSubMenuItem[]> => ({
  users: [
    { id: 'list', icon: Users, label: 'Lista de Usuarios', path: '/admin/users' },
    { id: 'roles', icon: Users2, label: 'Roles y Permisos', path: '/admin/roles' },
  ],
  courses: [
    { id: 'list', icon: BookOpen, label: 'Todos los Cursos', path: '/admin/courses' },
    { id: 'categories', icon: FileText, label: 'Categorías', path: '/admin/courses/categories' },
    { id: 'learning-paths', icon: Activity, label: 'Rutas de Aprendizaje', path: '/admin/courses/learning-paths' },
    { id: 'certificates', icon: FileText, label: 'Certificados', path: '/admin/courses/certificates' },
  ],
  settings: [
    { id: 'general', icon: Settings, label: 'General', path: '/admin/settings' },
    { id: 'security', icon: ShieldCheck, label: 'Seguridad', path: '/admin/settings/security' },
    { id: 'integrations', icon: Plug, label: 'Integraciones', path: '/admin/settings/integrations' },
    { id: 'database', icon: DatabaseZap, label: 'Base de Datos', path: '/admin/settings/database' },
  ],
  design: designFeatureEnabled ? [
    { id: 'components', icon: Palette, label: 'Componentes', path: '/admin/design' },
    { id: 'themes', icon: Palette, label: 'Temas', path: '/admin/design/themes' },
    { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/design/templates' },
  ] : [],
  analytics: [
    { id: 'overview', icon: LineChart, label: 'Visión General', path: '/admin/analytics' },
    { id: 'users', icon: Users, label: 'Usuarios', path: '/admin/analytics/users' },
    { id: 'courses', icon: BookOpen, label: 'Cursos', path: '/admin/analytics/courses' },
    { id: 'revenue', icon: DollarSign, label: 'Ingresos', path: '/admin/analytics/revenue' },
    { id: 'performance', icon: TrendingUp, label: 'Rendimiento', path: '/admin/analytics/performance' },
    { id: 'engagement', icon: Activity, label: 'Engagement', path: '/admin/analytics/engagement' },
  ],
  finances: [
    { id: 'overview', icon: CreditCard, label: 'Resumen', path: '/admin/billing' },
    { id: 'invoices', icon: Receipt, label: 'Facturas', path: '/admin/billing/invoices' },
    { id: 'subscriptions', icon: CreditCard, label: 'Suscripciones', path: '/admin/billing/subscriptions' },
    { id: 'bank', icon: BanknoteIcon, label: 'Movimientos Bancarios', path: '/admin/billing/bank' },
    { id: 'alerts', icon: Bell, label: 'Alertas', path: '/admin/billing/alerts' },
  ],
  pages: [
    { id: 'all', icon: FileText, label: 'Todas las Páginas', path: '/admin/pages' },
    { id: 'create', icon: FileText, label: 'Crear Página', path: '/admin/pages/create' },
    { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/pages/templates' },
  ],
});

interface AdminNavigationProps {
  enabled?: boolean;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ enabled = true }) => {
  const location = useLocation();
  const path = location.pathname;
  const { designFeatureEnabled } = useDesignSystem();
  
  // Determinar los elementos visibles del menú según las funcionalidades activadas
  const adminCategories = useMemo(() => {
    return getAllAdminCategories(designFeatureEnabled).filter(item => !item.hidden);
  }, [designFeatureEnabled]);
  
  // Menús secundarios según funcionalidades habilitadas
  const subMenus = useMemo(() => {
    return getSubMenus(designFeatureEnabled);
  }, [designFeatureEnabled]);
  
  // Determine active section and submenu
  const activeSection = useMemo(() => {
    const activeCategory = adminCategories.find(item => 
      path.includes(item.id)
    );
    return activeCategory?.id || '';
  }, [path, adminCategories]);
  
  // Get current submenu items based on active section
  const currentSubmenu = activeSection ? subMenus[activeSection] : null;
  
  if (!enabled) {
    return null;
  }
  
  return (
    <>
      <div className="w-full border-b sticky top-0 bg-background/95 backdrop-blur-sm z-20">
        <div className="mx-auto">
          {/* Main Categories Navigation */}
          <div className="flex flex-nowrap overflow-x-auto hide-scrollbar px-4 py-1 md:overflow-visible md:flex-wrap gap-1">
            {adminCategories.map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                data-tag={item.dataTag}
                className={cn(
                  "flex flex-shrink-0 items-center gap-1 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-accent text-sm font-medium",
                  path.includes(item.id) 
                    ? "bg-blue-600/10 text-blue-600 border-l-[3px] border-l-blue-600 pl-[calc(0.75rem-3px)]" 
                    : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Render submenu if available for current section */}
      {currentSubmenu && currentSubmenu.length > 0 && (
        <AdminSubMenu 
          items={currentSubmenu} 
          baseRoute={`/admin/${activeSection}`}
        />
      )}
    </>
  );
};

export default AdminNavigation;
