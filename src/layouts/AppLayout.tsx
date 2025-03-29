
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/types/auth';
import RoleSwitcher from '@/components/admin/RoleSwitcher';
import EditModeToggle from '@/components/admin/EditModeToggle';
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
import { 
  BookOpen, 
  Calendar, 
  Home, 
  LogOut, 
  MessageSquare, 
  Settings, 
  User, 
  Users, 
  Wallet 
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

type ViewAsRole = 'current' | 'student' | 'instructor' | 'admin';

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { logout, userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useState<ViewAsRole>('current');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  const getEffectiveRole = () => {
    if (viewAsRole === 'current') return userRole;
    return viewAsRole;
  };

  const effectiveRole = getEffectiveRole();

  const getRoleInitials = (role: string | null) => {
    if (!role) return 'U';
    return role.charAt(0).toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/10">
        <Sidebar className="border-r bg-background">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center">
              <NexoLogo className="h-9 w-auto" />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Panel Principal" asChild>
                  <Link to="/home" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <Home className="h-5 w-5 text-primary" />
                    <span className="font-medium">Panel Principal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Perfil" asChild>
                  <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <User className="h-5 w-5 text-primary" />
                    <span className="font-medium">Perfil</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cursos" asChild>
                  <Link to="/courses" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-medium">Cursos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {effectiveRole === 'instructor' && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Estudiantes" asChild>
                    <Link to="/instructor/students" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">Estudiantes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              {(effectiveRole === 'admin' || effectiveRole === 'instructor') && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Usuarios" asChild>
                    <Link to="/users" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Mensajes" asChild>
                  <Link to="/messages" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span className="font-medium">Mensajes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Calendario" asChild>
                  <Link to="/calendar" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="font-medium">Calendario</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Facturación" asChild>
                  <Link to="/billing" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <Wallet className="h-5 w-5 text-primary" />
                    <span className="font-medium">Facturación</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configuración" asChild>
                  <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="font-medium">Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            {userRole === 'admin' && (
              <div className="mb-4">
                <RoleSwitcher 
                  currentViewRole={viewAsRole}
                  onChange={(role) => setViewAsRole(role as ViewAsRole)}
                />
              </div>
            )}

            <div className="flex justify-between items-center p-2">
              {userRole === 'admin' && <EditModeToggle />}
              
              <Button 
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full ml-auto"
                onClick={handleLogout}
                title="Cerrar Sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 min-w-0 overflow-auto">
          <header className="border-b bg-background">
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
