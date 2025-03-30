
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Book, 
  School,
  Users,
  Cog
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { PlusCircle } from 'lucide-react';
import { UserRoleType, toUserRoleType } from '@/types/auth';

interface GestionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  role: UserRoleType;
}

const GestionNavigation: React.FC<GestionNavigationProps> = ({ isOpen, onToggle, role }) => {
  return (
    <div className="px-3">
      <Collapsible 
        open={isOpen} 
        onOpenChange={onToggle}
        className="space-y-2"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
          <span>Gestión</span>
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
          {role === 'instructor' && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/instructor/dashboard" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <LayoutDashboard className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Dashboard</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/instructor/courses" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <Book className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Mis Cursos</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/instructor/students" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <School className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Estudiantes</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
          
          {role === 'admin' && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/admin/users" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <Users className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Usuarios</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/admin/test-data" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <Cog className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Datos de Prueba</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default GestionNavigation;
