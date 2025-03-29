
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, MessageSquare } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-3 py-1">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-1"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-sm font-medium rounded-md hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-primary" />
            <span>Comunidad</span>
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
                <div className="flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7 opacity-50 text-foreground cursor-not-allowed">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>Feed</span>
                  <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Próximamente</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/messages" className={({ isActive }) => 
                  cn("flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )
                }>
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span>Mensajes</span>
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">2</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center gap-3 w-full px-2 py-2 rounded-md ml-7 opacity-50 text-foreground cursor-not-allowed">
                  <Users className="h-4 w-4 flex-shrink-0" />
                  <span>Red de Contactos</span>
                  <span className="ml-auto text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">Próximamente</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ComunidadNavigation;
