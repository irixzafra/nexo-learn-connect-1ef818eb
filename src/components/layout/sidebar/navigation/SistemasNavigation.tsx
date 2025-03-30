
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Shield, Server, Settings, BarChart3, Network, Lock, HardDrive, Terminal, Cpu } from 'lucide-react';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface SistemasNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SistemasNavigation: React.FC<SistemasNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="py-1">
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 transition-colors rounded-md cursor-pointer",
          isOpen ? "bg-accent" : "hover:bg-accent/50"
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <Database className="h-5 w-5 text-muted-foreground" />
          <span className={cn("font-medium text-sm", isCollapsed && "sr-only")}>Sistemas</span>
        </div>
        <div className={cn(isCollapsed && "sr-only")}>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={cn("mt-1 space-y-1 px-3", isCollapsed && "px-1")}>
          {isCollapsed ? (
            <div className="space-y-1">
              <CollapsedMenuItem to="/sistemas/dashboard" icon={BarChart3} label="Monitoreo" />
              <CollapsedMenuItem to="/sistemas/servers" icon={Server} label="Servidores" />
              <CollapsedMenuItem to="/sistemas/network" icon={Network} label="Red" />
              <CollapsedMenuItem to="/sistemas/database" icon={Database} label="Base de Datos" />
              <CollapsedMenuItem to="/sistemas/hardware" icon={HardDrive} label="Hardware" />
              <CollapsedMenuItem to="/sistemas/console" icon={Terminal} label="Consola" />
              <CollapsedMenuItem to="/sistemas/processors" icon={Cpu} label="Procesadores" />
              <CollapsedMenuItem to="/sistemas/seguridad" icon={Shield} label="Seguridad" />
              <CollapsedMenuItem to="/sistemas/access" icon={Lock} label="Control de Acceso" />
              <CollapsedMenuItem to="/sistemas/config" icon={Settings} label="Configuración" />
            </div>
          ) : (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/dashboard" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <BarChart3 className="h-4 w-4" />
                    <span>Monitoreo</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/servers" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Server className="h-4 w-4" />
                    <span>Servidores</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/network" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Network className="h-4 w-4" />
                    <span>Red</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/database" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Database className="h-4 w-4" />
                    <span>Base de Datos</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/hardware" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <HardDrive className="h-4 w-4" />
                    <span>Hardware</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/console" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Terminal className="h-4 w-4" />
                    <span>Consola</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/processors" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Cpu className="h-4 w-4" />
                    <span>Procesadores</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/seguridad" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Shield className="h-4 w-4" />
                    <span>Seguridad</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/access" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Lock className="h-4 w-4" />
                    <span>Control de Acceso</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sistemas/config" className={({ isActive }) => cn(
                    "flex items-center gap-3 w-full px-2 py-1.5 rounded-md text-sm",
                    isActive ? "bg-accent/50 text-accent-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"
                  )}>
                    <Settings className="h-4 w-4" />
                    <span>Configuración</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </div>
      )}
    </div>
  );
};

// Missing import for the ChevronRight and ChevronDown icons
import { ChevronRight, ChevronDown } from 'lucide-react';

interface MenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const CollapsedMenuItem: React.FC<MenuItemProps> = ({ to, icon: Icon, label }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <NavLink 
        to={to} 
        className={({ isActive }) => cn(
          "flex h-8 w-8 items-center justify-center rounded-md",
          isActive 
            ? "bg-accent text-accent-foreground" 
            : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">{label}</span>
      </NavLink>
    </TooltipTrigger>
    <TooltipContent side="right">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default SistemasNavigation;
