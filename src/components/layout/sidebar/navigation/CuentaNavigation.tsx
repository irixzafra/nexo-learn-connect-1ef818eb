
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CircleUser, Settings, HelpCircle, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface CuentaNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CuentaNavigation: React.FC<CuentaNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-3 py-1">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-1"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <CircleUser className="h-4 w-4 text-primary" />
            <span>Cuenta</span>
          </div>
          <div className={cn(
            "h-5 w-5 rounded-md flex items-center justify-center transition-transform",
            isOpen ? "rotate-180" : ""
          )}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 animate-accordion">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/settings" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
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
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/help" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <HelpCircle className="h-4 w-4 flex-shrink-0" />
                  <span>Ayuda / Soporte</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/about-us" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <span>Acerca de Nosotros</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CuentaNavigation;
