
import React from 'react';
import { NavLink } from 'react-router-dom';
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
import { cn } from '@/lib/utils';

const SidebarSettingsMenu: React.FC = () => {
  return (
    <div className="space-y-1 py-2">
      <h3 className="px-3 text-sm font-medium text-muted-foreground mb-2">
        Configuración del Sistema
      </h3>
      
      <NavLink
        to="/app/admin/settings"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive && location.pathname === "/app/admin/settings"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
        end
      >
        <Settings className="h-4 w-4" />
        <span>Configuración General</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/features"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <ToggleLeft className="h-4 w-4" />
        <span>Funcionalidades</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/design"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Palette className="h-4 w-4" />
        <span>Diseño</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/integrations"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Plug className="h-4 w-4" />
        <span>Conexiones</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/data"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Database className="h-4 w-4" />
        <span>Datos</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/pages"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <FileText className="h-4 w-4" />
        <span>Páginas</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/analytics"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <BarChart className="h-4 w-4" />
        <span>Analíticas</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/settings/roles"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Shield className="h-4 w-4" />
        <span>Roles y Permisos</span>
      </NavLink>
      
      <NavLink
        to="/app/admin/navigation-diagram"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Navigation className="h-4 w-4" />
        <span>Diagrama de Navegación</span>
      </NavLink>
    </div>
  );
};

export default SidebarSettingsMenu;
