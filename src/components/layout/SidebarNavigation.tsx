
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Home, 
  MessageSquare, 
  Settings, 
  User, 
  Users, 
  Wallet 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';

const SidebarNavigation: React.FC = () => {
  const { userRole } = useAuth();
  const effectiveRole = userRole;

  return (
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
  );
};

export default SidebarNavigation;
