
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/nexo-logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, BookOpen, Users, Settings, LogOut } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center p-2">
              <NexoLogo className="w-6 h-6 mr-2" />
              <span className="font-semibold text-lg">Nexo</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inicio" asChild>
                  <Link to="/home">
                    <Home className="mr-2" />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cursos" asChild>
                  <Link to="/courses">
                    <BookOpen className="mr-2" />
                    <span>Cursos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {(userRole === 'admin' || userRole === 'instructor') && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Usuarios" asChild>
                    <Link to="/users">
                      <Users className="mr-2" />
                      <span>Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configuración" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2" />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cerrar Sesión" onClick={handleLogout}>
                  <LogOut className="mr-2" />
                  <span>Cerrar Sesión</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 min-w-0 overflow-auto">
          <header className="border-b">
            <div className="container mx-auto py-3 px-6 flex justify-between items-center">
              <SidebarTrigger />
              <div className="text-sm text-muted-foreground">
                {userRole && (
                  <span className="capitalize">{userRole}</span>
                )}
              </div>
            </div>
          </header>
          
          <main className="min-h-[calc(100vh-60px)]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
