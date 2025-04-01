
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
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { settingsNavigation } from '@/config/navigation/settingsNavigation';

const SidebarSettingsMenu: React.FC = () => {
  return (
    <div className="space-y-1 py-2">
      <h3 className="px-3 text-sm font-medium text-muted-foreground mb-2">
        Configuración del Sistema
      </h3>
      
      <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
        end
      >
        <Settings className="h-4 w-4" />
        <span>General</span>
      </NavLink>
      
      <NavLink
        to="/admin/settings/features"
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
        to="/admin/settings/developer"
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        }
      >
        <Code className="h-4 w-4" />
        <span>Desarrollo</span>
      </NavLink>
      
      <NavLink
        to="/admin/settings/integrations"
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
        <span>Integraciones</span>
      </NavLink>
      
      <NavLink
        to="/admin/settings/data"
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
        <FileText className="h-4 w-4" />
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
        <BarChart className="h-4 w-4" />
        <span>Analíticas</span>
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
        <Shield className="h-4 w-4" />
        <span>Roles y Permisos</span>
      </NavLink>
    </div>
  );
};

export default SidebarSettingsMenu;
