
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
  Folder
} from 'lucide-react';

const AdminNavigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const isActive = (route: string) => {
    return path.includes(route);
  };
  
  // Menú admin que se adapta bien en responsive
  return (
    <div className="w-full border-b mb-6">
      <div className="container mx-auto py-2">
        <div className="flex flex-wrap gap-1 justify-center md:justify-start">
          {/* Dashboard */}
          <Link 
            to="/admin/dashboard"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/dashboard') && !isActive('/admin/dashboard/') ? "bg-secondary" : ""
            )}
          >
            <LayoutDashboard className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          
          {/* Usuarios */}
          <Link 
            to="/admin/users"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/users') ? "bg-secondary" : ""
            )}
          >
            <Users className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Usuarios</span>
          </Link>
          
          {/* Educación */}
          <Link 
            to="/admin/courses"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/courses') ? "bg-secondary" : ""
            )}
          >
            <BookOpen className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Educación</span>
          </Link>
          
          {/* Facturación */}
          <Link 
            to="/admin/billing"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/billing') ? "bg-secondary" : ""
            )}
          >
            <CreditCard className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Facturación</span>
          </Link>
          
          {/* Categorías */}
          <Link 
            to="/admin/content"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/content') || isActive('/admin/categories') ? "bg-secondary" : ""
            )}
          >
            <Folder className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Contenido</span>
          </Link>
          
          {/* Datos de Prueba */}
          <Link 
            to="/admin/test-data"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/test-data') ? "bg-secondary" : ""
            )}
          >
            <Database className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Datos</span>
          </Link>
          
          {/* Auditoría */}
          <Link 
            to="/admin/audit-log"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/audit-log') ? "bg-secondary" : ""
            )}
          >
            <History className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Auditoría</span>
          </Link>
          
          {/* Roles */}
          <Link 
            to="/admin/roles"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/roles') ? "bg-secondary" : ""
            )}
          >
            <Shield className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Roles</span>
          </Link>
          
          {/* Configuración */}
          <Link 
            to="/admin/settings"
            className={cn(
              "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
              "hover:bg-accent text-sm font-medium",
              isActive('/admin/settings') ? "bg-secondary" : ""
            )}
          >
            <Settings className="h-4 w-4 md:mr-1" />
            <span className="hidden sm:inline">Config</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
