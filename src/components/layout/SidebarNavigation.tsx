import {
  Home,
  Book,
  GraduationCap,
  Calendar,
  MessageSquare,
  Settings,
  ChevronDown,
  TestTube
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface SidebarMenuProps {
  children: React.ReactNode;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ children }) => (
  <nav className="grid gap-1">{children}</nav>
);

interface SidebarMenuItemProps {
  children: React.ReactNode;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ children }) => (
  <div className="rounded-md hover:bg-secondary">
    {children}
  </div>
);

interface SidebarMenuButtonProps {
  children: React.ReactNode;
}

const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({ children }) => (
  <div className="px-3 py-2 text-sm font-medium transition-colors hover:text-foreground">
    {children}
  </div>
);

interface SidebarGroupProps {
  children: React.ReactNode;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ children }) => (
  <div>{children}</div>
);

interface SidebarGroupLabelProps {
  children: React.ReactNode;
}

const SidebarGroupLabel: React.FC<SidebarGroupLabelProps> = ({ children }) => (
  <div className="mb-2 px-4 text-sm font-semibold opacity-75">{children}</div>
);

interface SidebarGroupContentProps {
  children: React.ReactNode;
}

const SidebarGroupContent: React.FC<SidebarGroupContentProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const SidebarNavigation = () => {
  const { userRole } = useAuth();
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/home">
                  <Home className="h-4 w-4" />
                  <span>Inicio</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/courses">
                  <Book className="h-4 w-4" />
                  <span>Cursos</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/my-learning">
                  <GraduationCap className="h-4 w-4" />
                  <span>Mi aprendizaje</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/calendar">
                  <Calendar className="h-4 w-4" />
                  <span>Calendario</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mensajes</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      
      {/* Admin Links */}
      {userRole === 'admin' && (
        <>
          <Accordion type="single" collapsible>
            <AccordionItem value="admin">
              <AccordionTrigger className='hover:no-underline'>
                Administración
                <ChevronDown className="h-4 w-4" />
              </AccordionTrigger>
              <AccordionContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/users">
                            <Settings className="h-4 w-4" />
                            <span>Usuarios</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink to="/admin/test-data">
                            <TestTube className="h-4 w-4" />
                            <span>Datos de Prueba</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
      
    </div>
  );
};
