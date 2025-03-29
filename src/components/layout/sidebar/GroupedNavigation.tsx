
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Book, 
  GraduationCap, 
  Home, 
  Settings, 
  User,
  MessageSquare,
  Users
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserRole } from '@/types/auth';

interface GroupedNavigationProps {
  viewAsRole?: string;
}

const GroupedNavigation: React.FC<GroupedNavigationProps> = ({ viewAsRole }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Inicio - Siempre visible */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/home" end className={({ isActive }) => isActive ? "text-primary" : ""}>
                  <Home className="h-4 w-4" />
                  <span>Inicio</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Grupo Aprendizaje */}
      <Accordion type="single" collapsible defaultValue="aprendizaje">
        <AccordionItem value="aprendizaje" className="border-none">
          <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-accent hover:no-underline">
            <span className="text-sm font-medium">Aprendizaje</span>
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/courses" className={({ isActive }) => isActive ? "text-primary" : ""}>
                        <Book className="h-4 w-4" />
                        <span>Explorar Cursos</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/my-courses" className={({ isActive }) => isActive ? "text-primary" : ""}>
                        <GraduationCap className="h-4 w-4" />
                        <span>Mis Cursos</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Grupo Comunidad - Futuro */}
      <Accordion type="single" collapsible>
        <AccordionItem value="comunidad" className="border-none">
          <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-accent hover:no-underline">
            <span className="text-sm font-medium">Comunidad</span>
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/messages" className={({ isActive }) => isActive ? "text-primary opacity-50" : "opacity-50"}>
                        <MessageSquare className="h-4 w-4" />
                        <span>Mensajes (Próximamente)</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/community" className={({ isActive }) => isActive ? "text-primary opacity-50" : "opacity-50"}>
                        <Users className="h-4 w-4" />
                        <span>Red (Próximamente)</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Grupo Gestión - Solo visible para instructor o admin */}
      {(viewAsRole === 'instructor' || viewAsRole === 'admin') && (
        <Accordion type="single" collapsible defaultValue="gestion">
          <AccordionItem value="gestion" className="border-none">
            <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-accent hover:no-underline">
              <span className="text-sm font-medium">Gestión</span>
            </AccordionTrigger>
            <AccordionContent>
              {viewAsRole === 'instructor' && (
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <NavLink to="/instructor/dashboard" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            <Home className="h-4 w-4" />
                            <span>Dashboard</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <NavLink to="/instructor/courses" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            <Book className="h-4 w-4" />
                            <span>Mis Cursos</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <NavLink to="/instructor/students" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            <Users className="h-4 w-4" />
                            <span>Estudiantes</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
              
              {viewAsRole === 'admin' && (
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <NavLink to="/admin/users" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            <Users className="h-4 w-4" />
                            <span>Usuarios</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <NavLink to="/admin/test-data" className={({ isActive }) => isActive ? "text-primary" : ""}>
                            <Settings className="h-4 w-4" />
                            <span>Datos de Prueba</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* Grupo Cuenta */}
      <Accordion type="single" collapsible>
        <AccordionItem value="cuenta" className="border-none">
          <AccordionTrigger className="py-2 px-3 rounded-md hover:bg-accent hover:no-underline">
            <span className="text-sm font-medium">Cuenta</span>
          </AccordionTrigger>
          <AccordionContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/profile" className={({ isActive }) => isActive ? "text-primary" : ""}>
                        <User className="h-4 w-4" />
                        <span>Perfil</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/settings" className={({ isActive }) => isActive ? "text-primary opacity-50" : "opacity-50"}>
                        <Settings className="h-4 w-4" />
                        <span>Configuración (Próximamente)</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GroupedNavigation;
