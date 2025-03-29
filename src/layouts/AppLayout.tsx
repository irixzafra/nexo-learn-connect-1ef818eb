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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
              <div className="mb-4 px-2">
                <Select 
                  value={viewAsRole} 
                  onValueChange={(value) => setViewAsRole(value as ViewAsRole)}
                >
                  <SelectTrigger className="w-full bg-muted/50">
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

            <div className="flex items-center space-x-3 px-2 py-2 rounded-md">
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getRoleInitials(effectiveRole)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium capitalize">
                  {effectiveRole || 'Usuario'}
                </span>
                {viewAsRole !== 'current' && (
                  <span className="text-xs text-muted-foreground">Modo vista</span>
                )}
              </div>
              
              <Button 
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
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
