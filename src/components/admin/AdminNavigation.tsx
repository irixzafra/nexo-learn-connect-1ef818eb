
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
  Route
} from 'lucide-react';

const AdminNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    return path.includes(route);
  };
  
  // Main categories as per the requirement
  const mainCategories = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard", showOnMobile: true },
    { icon: Users, label: "Usuarios", path: "/admin/users", showOnMobile: true },
    { icon: BookOpen, label: "Educación", path: "/admin/courses", showOnMobile: true },
    { icon: CreditCard, label: "Facturación", path: "/admin/billing", showOnMobile: true },
    { icon: Folder, label: "Contenido", path: "/admin/content", showOnMobile: true },
    { icon: Database, label: "Datos", path: "/admin/test-data", showOnMobile: true },
    { icon: History, label: "Auditoría", path: "/admin/audit-log", showOnMobile: true },
    { icon: Shield, label: "Roles", path: "/admin/roles", showOnMobile: true },
    { icon: Settings, label: "Config", path: "/admin/settings", showOnMobile: true }
  ];
  
  // Menú admin que se adapta bien en responsive
  return (
    <div className="w-full border-b mb-6 sticky top-0 bg-background z-10">
      <div className="container mx-auto py-2">
        <div className="flex flex-wrap gap-1 justify-center md:justify-start">
          {mainCategories.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent text-sm font-medium",
                isActive(item.path) ? "bg-secondary" : ""
              )}
            >
              <item.icon className="h-4 w-4 md:mr-1" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
