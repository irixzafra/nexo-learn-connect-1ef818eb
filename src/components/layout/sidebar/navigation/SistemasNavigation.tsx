
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, Server, Terminal, Settings } from 'lucide-react';
import { 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface SistemasNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SistemasNavigation: React.FC<SistemasNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <SidebarGroup defaultOpen={isOpen} onOpenChange={onToggle}>
      <SidebarGroupLabel
        icon={<Database className="h-4 w-4" />}
        label="Sistemas"
      />
      <SidebarGroupContent className="space-y-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/sistemas/dashboard" className={({ isActive }) => 
                cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )
              }>
                <Server className="h-4 w-4 flex-shrink-0" />
                <span>Panel de Control</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/sistemas/logs" className={({ isActive }) => 
                cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )
              }>
                <Terminal className="h-4 w-4 flex-shrink-0" />
                <span>Logs del Sistema</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton>
              <NavLink to="/sistemas/configuracion" className={({ isActive }) => 
                cn("flex items-center gap-3 w-full px-2 py-2 rounded-md",
                  isActive 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                )
              }>
                <Settings className="h-4 w-4 flex-shrink-0" />
                <span>Configuración</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SistemasNavigation;
