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
  Receipt,
  ChevronDown,
  ChevronRight,
  Map
} from 'lucide-react';
import { useDesignSystem } from '@/contexts/DesignSystemContext';

// Categoría de menú principal con sus subelementos
interface NavCategory {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
  dataTag: string;
  hidden: boolean;
  subItems?: NavSubItem[];
}

// SubItem del menú
interface NavSubItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
}

// Main navigation categories
const getAllAdminCategories = (designFeatureEnabled: boolean): NavCategory[] => [
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
    hidden: false,
    subItems: [
      { id: 'list', icon: Users, label: 'Lista de Usuarios', path: '/admin/users' },
      { id: 'roles', icon: Users2, label: 'Roles y Permisos', path: '/admin/roles' },
    ]
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
    dataTag: "admin-nav-courses",
    hidden: false,
    subItems: [
      { id: 'list', icon: BookOpen, label: 'Todos los Cursos', path: '/admin/courses' },
      { id: 'categories', icon: FileText, label: 'Categorías', path: '/admin/courses/categories' },
      { id: 'learning-paths', icon: Activity, label: 'Rutas de Aprendizaje', path: '/admin/courses/learning-paths' },
      { id: 'certificates', icon: FileText, label: 'Certificados', path: '/admin/courses/certificates' },
    ]
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/billing",
    dataTag: "admin-nav-finances",
    hidden: false,
    subItems: [
      { id: 'overview', icon: CreditCard, label: 'Resumen', path: '/admin/billing' },
      { id: 'invoices', icon: Receipt, label: 'Facturas', path: '/admin/billing/invoices' },
      { id: 'subscriptions', icon: CreditCard, label: 'Suscripciones', path: '/admin/billing/subscriptions' },
      { id: 'bank', icon: BanknoteIcon, label: 'Movimientos Bancarios', path: '/admin/billing/bank' },
      { id: 'alerts', icon: Bell, label: 'Alertas', path: '/admin/billing/alerts' },
    ]
  },
  { 
    id: 'design',
    icon: Palette,
    label: "Diseño",
    path: "/admin/design",
    dataTag: "admin-nav-design",
    hidden: !designFeatureEnabled,
    subItems: designFeatureEnabled ? [
      { id: 'components', icon: Palette, label: 'Componentes', path: '/admin/design' },
      { id: 'themes', icon: Palette, label: 'Temas', path: '/admin/design/themes' },
      { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/design/templates' },
    ] : []
  },
  { 
    id: 'navigation',
    icon: Map,
    label: "Navegación",
    path: "/admin/navigation",
    dataTag: "admin-nav-navigation",
    hidden: false
  },
  { 
    id: 'pages',
    icon: FileText,
    label: "Páginas",
    path: "/admin/pages",
    dataTag: "admin-nav-pages",
    hidden: false,
    subItems: [
      { id: 'all', icon: FileText, label: 'Todas las Páginas', path: '/admin/pages' },
      { id: 'create', icon: FileText, label: 'Crear Página', path: '/admin/pages/create' },
      { id: 'templates', icon: FileText, label: 'Plantillas', path: '/admin/pages/templates' },
    ]
  },
  { 
    id: 'analytics',
    icon: LineChart,
    label: "Analíticas",
    path: "/admin/analytics",
    dataTag: "admin-nav-analytics",
    hidden: false,
    subItems: [
      { id: 'overview', icon: LineChart, label: 'Visión General', path: '/admin/analytics' },
      { id: 'users', icon: Users, label: 'Usuarios', path: '/admin/analytics/users' },
      { id: 'courses', icon: BookOpen, label: 'Cursos', path: '/admin/analytics/courses' },
      { id: 'revenue', icon: DollarSign, label: 'Ingresos', path: '/admin/analytics/revenue' },
      { id: 'performance', icon: TrendingUp, label: 'Rendimiento', path: '/admin/analytics/performance' },
      { id: 'engagement', icon: Activity, label: 'Engagement', path: '/admin/analytics/engagement' },
    ]
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
    dataTag: "admin-nav-settings",
    hidden: false,
    subItems: [
      { id: 'general', icon: Settings, label: 'General', path: '/admin/settings' },
      { id: 'security', icon: ShieldCheck, label: 'Seguridad', path: '/admin/settings/security' },
      { id: 'integrations', icon: Plug, label: 'Integraciones', path: '/admin/settings/integrations' },
      { id: 'database', icon: DatabaseZap, label: 'Base de Datos', path: '/admin/settings/database' },
    ]
  }
];

interface AdminNavigationProps {
  enabled?: boolean;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ enabled = true }) => {
  const location = useLocation();
  const path = location.pathname;
  const { designFeatureEnabled } = useDesignSystem();
  
  // Estado para controlar qué categorías están expandidas
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({});
  
  // Determinar los elementos visibles del menú según las funcionalidades activadas
  const adminCategories = useMemo(() => {
    return getAllAdminCategories(designFeatureEnabled).filter(item => !item.hidden);
  }, [designFeatureEnabled]);
  
  // Determine active section and initialize expanded state if needed
  const activeSection = useMemo(() => {
    const activeCategory = adminCategories.find(item => 
      path.includes(item.id)
    );
    return activeCategory?.id || '';
  }, [path, adminCategories]);
  
  // Initialize expandedCategories when activeSection changes
  React.useEffect(() => {
    if (activeSection && !expandedCategories[activeSection]) {
      setExpandedCategories(prev => ({
        ...prev,
        [activeSection]: true
      }));
    }
  }, [activeSection]);

  // Función para alternar la expansión de una categoría
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  if (!enabled) {
    return null;
  }
  
  return (
    <div className="flex flex-col h-full overflow-y-auto pt-2">
      <div className="px-3 mb-4">
        <h2 className="text-xl font-bold mb-1">Administración</h2>
        <p className="text-sm text-muted-foreground">Panel de control</p>
      </div>
      
      <div className="space-y-1 px-3">
        {adminCategories.map((category) => {
          const isActive = path.includes(category.id);
          const isExpanded = expandedCategories[category.id];
          const hasSubItems = category.subItems && category.subItems.length > 0;
          
          return (
            <div key={category.id} className="space-y-1">
              {/* Categoría principal */}
              <div 
                className={cn(
                  "flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition-colors",
                  isActive ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => hasSubItems ? toggleCategory(category.id) : null}
                data-tag={category.dataTag}
              >
                <div className="flex items-center">
                  <category.icon className={cn("h-5 w-5 mr-2", isActive ? "text-blue-600" : "text-gray-500")} />
                  <span className="font-medium">{category.label}</span>
                </div>
                
                {hasSubItems && (
                  <div className="text-gray-500">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Subelementos de la categoría */}
              {hasSubItems && isExpanded && (
                <div className="ml-6 border-l border-gray-200 dark:border-gray-700 pl-3 space-y-1">
                  {category.subItems?.map(subItem => {
                    const isSubItemActive = path === subItem.path;
                    
                    return (
                      <Link
                        key={`${category.id}-${subItem.id}`}
                        to={subItem.path}
                        className={cn(
                          "flex items-center py-2 px-3 rounded-md text-sm transition-colors",
                          isSubItemActive 
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        <subItem.icon className={cn("h-4 w-4 mr-2", isSubItemActive ? "text-blue-600" : "text-gray-500")} />
                        <span>{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNavigation;
