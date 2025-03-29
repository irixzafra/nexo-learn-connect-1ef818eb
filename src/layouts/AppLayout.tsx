
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

  // Esta función determina el rol que se usará para la UI
  const getEffectiveRole = () => {
    if (viewAsRole === 'current') return userRole;
    return viewAsRole;
  };

  const effectiveRole = getEffectiveRole();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center p-4">
              <NexoLogo className="w-9 h-9 mr-3 text-primary" />
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-primary">Nexo</span>
                <span className="text-xs text-muted-foreground">Learning Platform</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Panel Principal" asChild>
                  <Link to="/home">
                    <Home className="mr-2" />
                    <span>Panel Principal</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Perfil" asChild>
                  <Link to="/profile">
                    <User className="mr-2" />
                    <span>Perfil</span>
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
              
              {effectiveRole === 'instructor' && (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Estudiantes" asChild>
                    <Link to="/instructor/students">
                      <Users className="mr-2" />
                      <span>Estudiantes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              
              {(effectiveRole === 'admin' || effectiveRole === 'instructor') && (
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
                <SidebarMenuButton tooltip="Mensajes" asChild>
                  <Link to="/messages">
                    <MessageSquare className="mr-2" />
                    <span>Mensajes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Calendario" asChild>
                  <Link to="/calendar">
                    <Calendar className="mr-2" />
                    <span>Calendario</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Facturación" asChild>
                  <Link to="/billing">
                    <Wallet className="mr-2" />
                    <span>Facturación</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
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
          
          <SidebarFooter className="border-t flex flex-col gap-3 p-4">
            {/* Role selector - solo visible para admin */}
            {userRole === 'admin' && (
              <div className="mb-2">
                <Select 
                  value={viewAsRole} 
                  onValueChange={(value) => setViewAsRole(value as ViewAsRole)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ver como" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      Ver como: {userRole && userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </SelectItem>
                    <SelectItem value="student">Ver como: Estudiante</SelectItem>
                    <SelectItem value="instructor">Ver como: Instructor</SelectItem>
                    <SelectItem value="admin">Ver como: Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* User role badge */}
            <div className="flex items-center space-x-2 py-2 px-3 rounded-md bg-secondary/50">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {effectiveRole ? effectiveRole.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm capitalize">
                  {effectiveRole || 'Usuario'}
                </span>
                {viewAsRole !== 'current' && (
                  <span className="text-[10px] text-muted-foreground">Modo vista</span>
                )}
              </div>
              <Button 
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8"
                onClick={handleLogout}
                title="Cerrar Sesión"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
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
