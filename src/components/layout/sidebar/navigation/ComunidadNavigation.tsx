
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Users } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <div className="px-3">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-2"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
          <span>Comunidad</span>
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
                    <NavLink to="/home/messages" className={({ isActive }) => 
                      isActive ? "text-primary opacity-50 flex items-center w-full" : "opacity-50 flex items-center w-full"
                    }>
                      <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Mensajes (Próximamente)</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink to="/home/community" className={({ isActive }) => 
                      isActive ? "text-primary opacity-50 flex items-center w-full" : "opacity-50 flex items-center w-full"
                    }>
                      <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Red (Próximamente)</span>
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

export default ComunidadNavigation;
