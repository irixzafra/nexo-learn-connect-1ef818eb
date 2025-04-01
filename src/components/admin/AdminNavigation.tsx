import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield, 
  Database, 
  FileText, 
  BarChart,
  BookOpen,
  CreditCard,
  Route,
  Bell,
  History,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { adminNavigation } from '@/config/navigation/adminNavigation';
import { settingsNavigation } from '@/config/navigation/settingsNavigation';
import { cn } from '@/lib/utils';
import SidebarSettingsMenu from './SidebarSettingsMenu';

interface AdminNavigationProps {
  enabled?: boolean;
}

export const AdminNavigation: React.FC<AdminNavigationProps> = ({ enabled = true }) => {
  const location = useLocation();
  const [settingsOpen, setSettingsOpen] = useState(
    location.pathname.includes('/admin/settings')
  );
  
  if (!enabled) return null;
  
  const inSettingsSection = location.pathname.includes('/admin/settings');

  return (
    <div className="space-y-1 px-2 py-4 overflow-y-auto flex-1">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </NavLink>
      
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Users className="h-5 w-5" />
        <span>Usuarios</span>
      </NavLink>
      
      <NavLink
        to="/admin/roles"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Shield className="h-5 w-5" />
        <span>Roles y Permisos</span>
      </NavLink>
      
      <NavLink
        to="/admin/courses"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <BookOpen className="h-5 w-5" />
        <span>Cursos</span>
      </NavLink>
      
      <NavLink
        to="/admin/learning-paths"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Route className="h-5 w-5" />
        <span>Rutas de Aprendizaje</span>
      </NavLink>
      
      <NavLink
        to="/admin/billing"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <CreditCard className="h-5 w-5" />
        <span>Facturación</span>
      </NavLink>
      
      <NavLink
        to="/admin/alerts"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Bell className="h-5 w-5" />
        <span>Alertas</span>
      </NavLink>
      
      <NavLink
        to="/admin/pages"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <FileText className="h-5 w-5" />
        <span>Páginas</span>
      </NavLink>
      
      <NavLink
        to="/admin/analytics"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <BarChart className="h-5 w-5" />
        <span>Analíticas</span>
      </NavLink>
      
      <NavLink
        to="/admin/test-data"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Database className="h-5 w-5" />
        <span>Datos de Prueba</span>
      </NavLink>
      
      <NavLink
        to="/admin/audit-log"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <History className="h-5 w-5" />
        <span>Auditoría</span>
      </NavLink>
      
      <NavLink
        to="/admin/navigation-diagram"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Navigation className="h-5 w-5" />
        <span>Diagrama de Navegación</span>
      </NavLink>
      
      <div className="relative">
        <div 
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
            inSettingsSection
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <Settings className="h-5 w-5" />
          <span>Configuración</span>
          <ChevronRight 
            className={cn(
              "ml-auto h-4 w-4 transition-transform", 
              settingsOpen && "rotate-90"
            )} 
          />
        </div>
        
        {settingsOpen && <SidebarSettingsMenu />}
      </div>
    </div>
  );
};

export default AdminNavigation;
