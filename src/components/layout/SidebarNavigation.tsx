
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  Home, 
  BookOpen, 
  Compass, 
  Users, 
  FileText, 
  Settings, 
  Presentation, 
  HelpCircle, 
  Database, 
  BarChart3, 
  ShieldCheck, 
  UserCog,
  CreditCard,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    general: true,
    learning: true,
    administration: true,
    instructor: true
  });
  
  // Determinar el rol efectivo para la navegación
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  const toggleGroup = (group: string) => {
    setExpanded(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Verificar si una ruta está activa (actual o sus subrutas)
  const isRouteActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Componentes de elemento de menú reutilizables
  const MenuItem = ({ to, icon: Icon, label, badge, disabled = false }: 
    { to: string; icon: React.ElementType; label: string; badge?: string; disabled?: boolean }) => (
    <SidebarMenuItem className={cn(disabled && "opacity-50")}>
      <SidebarMenuButton asChild disabled={disabled}>
        <Link 
          to={disabled ? "#" : to} 
          className={cn(
            "flex items-center justify-between gap-2",
            isRouteActive(to) && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          onClick={disabled ? (e) => e.preventDefault() : undefined}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </span>
          {badge && (
            <Badge variant="secondary" className="ml-auto">
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  // Definir los elementos de menú para estudiantes
  const studentMenuItems = (
    <>
      <SidebarGroup>
        <SidebarGroupLabel 
          onClick={() => toggleGroup('general')}
          className="cursor-pointer flex items-center justify-between"
        >
          General
          <span className={`transform transition-transform ${expanded.general ? 'rotate-180' : 'rotate-0'}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </SidebarGroupLabel>
        {expanded.general && (
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem to="/home" icon={Home} label="Panel Principal" />
              <MenuItem to="/courses" icon={Compass} label="Explorar Cursos" />
              <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" />
              <MenuItem to="/calendar" icon={Calendar} label="Calendario" />
              <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge="2" />
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel
          onClick={() => toggleGroup('learning')}
          className="cursor-pointer flex items-center justify-between"
        >
          Aprendizaje
          <span className={`transform transition-transform ${expanded.learning ? 'rotate-180' : 'rotate-0'}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </SidebarGroupLabel>
        {expanded.learning && (
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuItem to="/scholarships" icon={FileText} label="Becas" />
              <MenuItem to="/profile" icon={UserCog} label="Mi Perfil" />
              <MenuItem to="/settings" icon={Settings} label="Configuración" />
            </SidebarMenu>
          </SidebarGroupContent>
        )}
      </SidebarGroup>
    </>
  );

  // Definir los elementos de menú para instructores
  const instructorMenuItems = (
    <SidebarGroup>
      <SidebarGroupLabel
        onClick={() => toggleGroup('instructor')}
        className="cursor-pointer flex items-center justify-between"
      >
        Instructor
        <span className={`transform transition-transform ${expanded.instructor ? 'rotate-180' : 'rotate-0'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </SidebarGroupLabel>
      {expanded.instructor && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/instructor/dashboard" icon={Presentation} label="Panel Instructor" />
            <MenuItem to="/instructor/courses" icon={BookOpen} label="Mis Cursos" />
            <MenuItem to="/instructor/students" icon={Users} label="Estudiantes" />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // Definir los elementos de menú para administradores
  const adminMenuItems = (
    <SidebarGroup>
      <SidebarGroupLabel
        onClick={() => toggleGroup('administration')}
        className="cursor-pointer flex items-center justify-between"
      >
        Administración
        <span className={`transform transition-transform ${expanded.administration ? 'rotate-180' : 'rotate-0'}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </SidebarGroupLabel>
      {expanded.administration && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/admin/dashboard" icon={BarChart3} label="Panel Admin" />
            <MenuItem to="/admin/users" icon={Users} label="Usuarios" />
            <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
            <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // Contenido del menú según el rol
  let menuContent;
  
  switch (effectiveRole) {
    case 'admin':
      menuContent = (
        <>
          {studentMenuItems}
          {instructorMenuItems}
          {adminMenuItems}
        </>
      );
      break;
    case 'instructor':
      menuContent = (
        <>
          {studentMenuItems}
          {instructorMenuItems}
        </>
      );
      break;
    default: // 'student' u otro rol
      menuContent = studentMenuItems;
  }

  return (
    <>
      {menuContent}
      
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/about-us" icon={HelpCircle} label="Acerca de Nosotros" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default SidebarNavigation;
