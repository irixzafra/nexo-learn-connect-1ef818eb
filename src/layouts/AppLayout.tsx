
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Home,
  Book,
  Bookmark,
  Settings,
  Users,
  FileEdit
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { UserRole } from '@/types/auth';

// Placeholder para uso futuro con contexto de Auth
const mockedUser = {
  fullName: 'Usuario Demo',
  email: 'usuario@ejemplo.com',
  role: 'admin' as UserRole
};

interface AppLayoutProps {
  children: React.ReactNode;
}

// Esta es una implementación básica que se ampliará con el context de Auth
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // Estado para simular el Role Switcher
  const [viewAsRole, setViewAsRole] = useState<UserRole>(mockedUser.role);
  
  // Función placeholder para logout
  const handleLogout = () => {
    console.log('Logout clicked');
  };
  
  // Obtiene las iniciales del nombre del usuario
  const getUserInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <AppSidebar viewAsRole={viewAsRole} />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-16 border-b flex items-center px-4 justify-between lg:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SidebarTrigger>
              <NexoLogo className="text-xl hidden md:flex" />
            </div>
            
            <div className="flex items-center gap-4">
              {/* Role Switcher (Solo visible para admin) */}
              {mockedUser.role === 'admin' && (
                <div className="hidden sm:flex items-center text-sm border rounded-md py-1 px-3">
                  <span className="text-muted-foreground mr-2">Ver como:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 h-auto flex items-center gap-1">
                        <span className="capitalize">{viewAsRole}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Cambiar Vista</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setViewAsRole('admin')}>
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setViewAsRole('instructor')}>
                        Instructor
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setViewAsRole('student')}>
                        Estudiante
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarFallback>
                        {getUserInitials(mockedUser.fullName || 'Usuario')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configuración</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Componente de la Sidebar
interface AppSidebarProps {
  viewAsRole: UserRole;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole }) => {
  return (
    <Sidebar className="border-r">
      <SidebarContent className="p-2">
        <div className="flex h-14 items-center px-4 mb-2">
          <NexoLogo />
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Menú común para todos los roles */}
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/home" className="flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Menú para Estudiantes */}
        {(viewAsRole === 'student' || viewAsRole === 'admin') && (
          <SidebarGroup>
            <SidebarGroupLabel>Estudiante</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/student/my-courses" className="flex items-center">
                      <Book className="h-5 w-5 mr-2" />
                      <span>Mis Cursos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/courses" className="flex items-center">
                      <Bookmark className="h-5 w-5 mr-2" />
                      <span>Catálogo</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Menú para Instructores */}
        {(viewAsRole === 'instructor' || viewAsRole === 'admin') && (
          <SidebarGroup>
            <SidebarGroupLabel>Instructor</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/instructor/courses" className="flex items-center">
                      <FileEdit className="h-5 w-5 mr-2" />
                      <span>Mis Cursos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        
        {/* Menú para Administradores */}
        {viewAsRole === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin/users" className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span>Usuarios</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin/courses" className="flex items-center">
                      <Book className="h-5 w-5 mr-2" />
                      <span>Cursos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppLayout;
