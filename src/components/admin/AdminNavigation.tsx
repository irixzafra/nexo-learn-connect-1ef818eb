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
  School,
  BarChart3,
  PieChart,
  TrendingUp,
  Users2,
  Activity,
  DollarSign,
  ToggleRight,
  Plug,
  ShieldCheck,
  DatabaseZap
} from 'lucide-react';
import AdminSubMenu, { AdminSubMenuItem } from './AdminSubMenu';

// Main navigation categories
const adminCategories = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/admin/dashboard",
    dataTag: "admin-nav-dashboard"
  },
  { 
    id: 'users',
    icon: Users, 
    label: "Usuarios", 
    path: "/admin/users",
    dataTag: "admin-nav-users"
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
    dataTag: "admin-nav-courses"
  },
  { 
    id: 'instructors',
    icon: School, 
    label: "Instructores", 
    path: "/admin/instructors",
    dataTag: "admin-nav-instructors"
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/billing",
    dataTag: "admin-nav-finances"
  },
  { 
    id: 'design',
    icon: Palette,
    label: "Diseño",
    path: "/admin/design",
    dataTag: "admin-nav-design"  
  },
  { 
    id: 'pages',
    icon: FileText,
    label: "Páginas",
    path: "/admin/pages",
    dataTag: "admin-nav-pages"  
  },
  { 
    id: 'analytics',
    icon: LineChart,
    label: "Analíticas",
    path: "/admin/analytics",
    dataTag: "admin-nav-analytics"  
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
    dataTag: "admin-nav-settings"
  }
];

// Sub-navigation menus for each section
const subMenus: Record<string, AdminSubMenuItem[]> = {
  users: [
    { id: 'list', icon: Users, label: 'Lista de Usuarios', path: '/admin/users' },
    { id: 'roles', icon: Users2, label: 'Roles y Permisos', path: '/admin/roles' },
    { id: 'analytics', icon: BarChart3, label: 'Estadísticas', path: '/admin/users/analytics' },
  ],
  courses: [
    { id: 'list', icon: BookOpen, label: 'Todos los Cursos', path: '/admin/courses' },
    { id: 'categories', icon: FileText, label: 'Categorías', path: '/admin/courses/categories' },
    { id: 'learning-paths', icon: Activity, label: 'Rutas de Aprendizaje', path: '/admin/courses/learning-paths' },
    { id: 'certificates', icon: FileText, label: 'Certificados', path: '/admin/courses/certificates' },
  ],
  settings: [
    { id: 'general', icon: Settings, label: 'General', path: '/admin/settings' },
    { id: 'appearance', icon: Palette, label: 'Apariencia', path: '/admin/settings/appearance' },
    { id: 'security', icon: FileText, label: 'Seguridad', path: '/admin/settings/security' },
    { id: 'features', icon: FileText, label: 'Funcionalidades', path: '/admin/settings/features' },
    { id: 'notifications', icon: FileText, label: 'Notificaciones', path: '/admin/settings/notifications' },
    { id: 'developer', icon: FileText, label: 'Desarrollador', path: '/admin/settings/developer' },
  ],
  design: [
    { id: 'components', icon: Palette, label: 'Componentes', path: '/admin/design' },
    { id: 'themes', icon: Palette, label: 'Temas', path: '/admin/design/themes' },
    { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/design/templates' },
  ],
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
    { id: 'transactions', icon: DollarSign, label: 'Transacciones', path: '/admin/billing/transactions' },
    { id: 'subscriptions', icon: FileText, label: 'Suscripciones', path: '/admin/billing/subscriptions' },
    { id: 'reports', icon: PieChart, label: 'Informes', path: '/admin/billing/reports' },
  ],
  pages: [
    { id: 'all', icon: FileText, label: 'Todas las Páginas', path: '/admin/pages' },
    { id: 'create', icon: FileText, label: 'Crear Página', path: '/admin/pages/create' },
    { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/pages/templates' },
  ],
  instructors: [
    { id: 'list', icon: School, label: 'Instructores', path: '/admin/instructors' },
    { id: 'applicants', icon: Users, label: 'Solicitudes', path: '/admin/instructors/applicants' },
    { id: 'performance', icon: BarChart3, label: 'Rendimiento', path: '/admin/instructors/performance' },
  ],
};

interface AdminNavigationProps {
  enabled?: boolean;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ enabled = true }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine active section and submenu
  const activeSection = useMemo(() => {
    const activeCategory = adminCategories.find(item => 
      path.includes(item.id)
    );
    return activeCategory?.id || '';
  }, [path]);
  
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
          <div className="flex flex-nowrap overflow-x-auto hide-scrollbar md:overflow-visible md:flex-wrap gap-1">
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
