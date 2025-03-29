
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Server, 
  Network, 
  Database, 
  HardDrive, 
  Terminal, 
  Cpu, 
  Shield, 
  Lock, 
  Settings 
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

interface SistemasNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SistemasNavigation: React.FC<SistemasNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-3">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-2"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
          <span>Sistemas</span>
          <div className={cn(
            "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
            isOpen ? "bg-primary/10 text-primary" : "hover:bg-muted"
          )}>
            <PlusCircle className={cn(
              "h-3.5 w-3.5 transition-transform", 
              isOpen && "rotate-45"
            )} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/dashboard" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <BarChart3 className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Monitoreo</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/servers" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Server className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Servidores</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/network" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Network className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Red</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/database" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Database className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Base de Datos</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/hardware" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <HardDrive className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Hardware</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/console" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Terminal className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Consola</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/processors" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Cpu className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Procesadores</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/seguridad" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Shield className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Seguridad</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/access" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Lock className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Control de Acceso</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/sistemas/config" className={({ isActive }) => 
                      isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                    }>
                      <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Configuración</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SistemasNavigation;
