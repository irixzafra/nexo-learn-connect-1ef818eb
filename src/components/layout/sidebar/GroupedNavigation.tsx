import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Book, 
  GraduationCap, 
  Home, 
  Settings, 
  User,
  MessageSquare,
  Users,
  LayoutDashboard,
  BookOpen,
  School,
  Cog,
  Shield,
  PlusCircle,
  BarChart3,
  Server
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { UserRole } from '@/types/auth';
import { cn } from '@/lib/utils';

interface GroupedNavigationProps {
  viewAsRole?: string;
}

const GroupedNavigation: React.FC<GroupedNavigationProps> = ({ viewAsRole }) => {
  // Retrieve previous state from localStorage or use defaults
  const savedState = localStorage.getItem('sidebarGroups');
  const initialState = savedState ? JSON.parse(savedState) : {
    aprendizaje: true,
    comunidad: false,
    gestion: true,
    sistemas: true,
    cuenta: false
  };

  const [openGroups, setOpenGroups] = React.useState(initialState);

  // Save state to localStorage when it changes
  React.useEffect(() => {
    localStorage.setItem('sidebarGroups', JSON.stringify(openGroups));
  }, [openGroups]);

  const toggleGroup = (group: keyof typeof openGroups) => {
    setOpenGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Inicio - Siempre visible */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <NavLink to="/home" end className={({ isActive }) => 
                  isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                }>
                  <Home className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span>Inicio</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Grupo Sistemas - Nuevo */}
      <div className="px-3">
        <Collapsible 
          open={openGroups.sistemas} 
          onOpenChange={() => toggleGroup('sistemas')}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Sistemas</span>
            <div className={cn(
              "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
              openGroups.sistemas ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              <PlusCircle className={cn(
                "h-3.5 w-3.5 transition-transform", 
                openGroups.sistemas && "rotate-45"
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
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Grupo Aprendizaje */}
      <div className="px-3">
        <Collapsible 
          open={openGroups.aprendizaje} 
          onOpenChange={() => toggleGroup('aprendizaje')}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Aprendizaje</span>
            <div className={cn(
              "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
              openGroups.aprendizaje ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              <PlusCircle className={cn(
                "h-3.5 w-3.5 transition-transform", 
                openGroups.aprendizaje && "rotate-45"
              )} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-1">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/courses" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <BookOpen className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Explorar Cursos</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/my-courses" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <GraduationCap className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Mis Cursos</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Grupo Comunidad */}
      <div className="px-3">
        <Collapsible 
          open={openGroups.comunidad} 
          onOpenChange={() => toggleGroup('comunidad')}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Comunidad</span>
            <div className={cn(
              "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
              openGroups.comunidad ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              <PlusCircle className={cn(
                "h-3.5 w-3.5 transition-transform", 
                openGroups.comunidad && "rotate-45"
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

      {/* Grupo Gestión - Solo visible para instructor o admin */}
      {(viewAsRole === 'instructor' || viewAsRole === 'admin') && (
        <div className="px-3">
          <Collapsible 
            open={openGroups.gestion} 
            onOpenChange={() => toggleGroup('gestion')}
            className="space-y-2"
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
              <span>Gestión</span>
              <div className={cn(
                "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
                openGroups.gestion ? "bg-primary/10 text-primary" : "hover:bg-muted"
              )}>
                <PlusCircle className={cn(
                  "h-3.5 w-3.5 transition-transform", 
                  openGroups.gestion && "rotate-45"
                )} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-1">
              {viewAsRole === 'instructor' && (
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
              
              {viewAsRole === 'admin' && (
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
      )}

      {/* Grupo Cuenta */}
      <div className="px-3">
        <Collapsible 
          open={openGroups.cuenta} 
          onOpenChange={() => toggleGroup('cuenta')}
          className="space-y-2"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-medium hover:text-primary transition-colors">
            <span>Cuenta</span>
            <div className={cn(
              "h-5 w-5 rounded-md flex items-center justify-center transition-colors",
              openGroups.cuenta ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}>
              <PlusCircle className={cn(
                "h-3.5 w-3.5 transition-transform", 
                openGroups.cuenta && "rotate-45"
              )} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-1">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/profile" className={({ isActive }) => 
                        isActive ? "text-primary flex items-center w-full" : "flex items-center w-full"
                      }>
                        <User className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Perfil</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink to="/home/settings" className={({ isActive }) => 
                        isActive ? "text-primary opacity-50 flex items-center w-full" : "opacity-50 flex items-center w-full"
                      }>
                        <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
                        <span>Configuración (Próximamente)</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default GroupedNavigation;
