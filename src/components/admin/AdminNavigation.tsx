
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  FileText,
  Database,
  History,
  Settings,
  Shield,
  Folder,
  BarChart,
  LineChart,
  School,
  Route,
  Award,
  Search,
  Tags
} from 'lucide-react';

// Estructura de categorías y subcategorías
const adminCategories = [
  { 
    id: 'dashboard',
    icon: LayoutDashboard, 
    label: "Dashboard", 
    path: "/admin/dashboard"
  },
  { 
    id: 'users',
    icon: Users, 
    label: "Usuarios", 
    path: "/admin/users",
    subCategories: [
      { id: 'users-list', label: "Usuarios", path: "/admin/users" },
      { id: 'roles', label: "Roles", path: "/admin/roles" },
      { id: 'analytics', label: "Analíticas", path: "/admin/users/analytics" }
    ]
  },
  { 
    id: 'courses',
    icon: BookOpen, 
    label: "Cursos", 
    path: "/admin/courses",
    subCategories: [
      { id: 'courses-list', label: "Listado de cursos", path: "/admin/courses" },
      { id: 'categories', label: "Categorías", path: "/admin/content/categories" },
      { id: 'learning-paths', label: "Rutas de Aprendizaje", path: "/admin/learning-paths" },
      { id: 'certificates', label: "Certificados", path: "/admin/courses/certificates" },
      { id: 'analytics', label: "Analíticas", path: "/admin/courses/analytics" }
    ]
  },
  { 
    id: 'finances',
    icon: CreditCard, 
    label: "Finanzas", 
    path: "/admin/billing",
    subCategories: [
      { id: 'payments', label: "Cobros", path: "/admin/billing/payments" },
      { id: 'subscriptions', label: "Suscripciones", path: "/admin/billing/subscriptions" },
      { id: 'analytics', label: "Analíticas", path: "/admin/billing/analytics" }
    ]
  },
  { 
    id: 'data',
    icon: Database, 
    label: "Datos", 
    path: "/admin/test-data",
    subCategories: [
      { id: 'content-generation', label: "Generación de Contenido", path: "/admin/test-data" },
      { id: 'audit-logs', label: "Logs (Auditoría)", path: "/admin/audit-log" },
      { id: 'analytics', label: "Analíticas", path: "/admin/data/analytics" }
    ]
  },
  { 
    id: 'config',
    icon: Settings, 
    label: "Config", 
    path: "/admin/settings",
    subCategories: [
      { id: 'features', label: "Funcionalidades", path: "/admin/settings" },
      { id: 'security', label: "Seguridad", path: "/admin/settings/security" },
      { id: 'appearance', label: "Apariencia", path: "/admin/settings/appearance" },
      { id: 'content', label: "Contenido", path: "/admin/settings/content" },
      { id: 'analytics', label: "Analíticas", path: "/admin/settings/analytics" }
    ]
  }
];

const AdminNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    return path.includes(route);
  };
  
  // Obtiene la categoría actual basada en la ruta
  const getCurrentCategory = () => {
    return adminCategories.find(cat => 
      path.includes(cat.id) || (cat.subCategories && cat.subCategories.some(sub => path.includes(sub.path)))
    );
  };
  
  const currentCategory = getCurrentCategory();
  
  return (
    <div className="w-full border-b mb-6 sticky top-0 bg-background z-10">
      <div className="container mx-auto py-2">
        {/* Main Categories Navigation */}
        <div className="flex flex-wrap gap-1 justify-center md:justify-start mb-1">
          {adminCategories.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent text-sm font-medium",
                path.includes(item.id) ? "bg-secondary" : ""
              )}
            >
              <item.icon className="h-4 w-4 md:mr-1" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
        
        {/* Subcategories for current section (shown as tabs) */}
        {currentCategory?.subCategories && (
          <div className="flex overflow-x-auto gap-1 px-1 py-1 border-t">
            {currentCategory.subCategories.map((subItem) => (
              <Link 
                key={subItem.path}
                to={subItem.path}
                className={cn(
                  "flex items-center px-3 py-1 rounded-md text-xs transition-colors",
                  "hover:bg-muted whitespace-nowrap",
                  path === subItem.path ? "bg-muted font-medium" : "text-muted-foreground"
                )}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavigation;
