

import React, { useState, useEffect } from 'react';
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
  Settings, 
  Presentation, 
  HelpCircle, 
  Database, 
  BarChart3, 
  UserCog,
  CreditCard,
  Calendar,
  MessageSquare,
  School,
  FileText,
  Info,
  LogOut
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  const location = useLocation();
  
  // Retrieve previous state from localStorage or use defaults
  const savedState = localStorage.getItem('sidebarGroups');
  const initialState = savedState ? JSON.parse(savedState) : {
    general: true,
    learning: true,
    community: false,
    administration: true,
    instructor: true,
    account: true
  };
  
  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialState);
  
  // Determinar el rol efectivo para la navegación
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarGroups', JSON.stringify(expanded));
  }, [expanded]);

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
    <SidebarMenuItem>
      <SidebarMenuButton asChild disabled={disabled}>
        <Link 
          to={disabled ? "#" : to} 
          className={cn(
            "flex items-center justify-between gap-2 px-2 py-2 rounded-md",
            isRouteActive(to) ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-accent/20",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              toast.info("Esta funcionalidad estará disponible próximamente");
            }
          }}
        >
          <span className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </span>
          {badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  // Componente para el encabezado del grupo con flecha indicadora
  const GroupLabel = ({ label, isExpanded, onClick }: { label: string; isExpanded: boolean; onClick: () => void }) => (
    <SidebarGroupLabel 
      onClick={onClick}
      className="cursor-pointer flex items-center justify-between px-2 py-2 text-sm font-medium transition-colors hover:text-primary"
    >
      {label}
      <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </SidebarGroupLabel>
  );

  // 1. Sección General/Principal
  const generalSection = (
    <SidebarGroup>
      <GroupLabel 
        label="Principal" 
        isExpanded={expanded.general} 
        onClick={() => toggleGroup('general')} 
      />
      {expanded.general && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/home" icon={Home} label="Inicio" />
            <MenuItem to="/courses" icon={Compass} label="Explorar Cursos" />
            <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" />
            <MenuItem to="/calendar" icon={Calendar} label="Calendario" />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // 2. Sección Aprendizaje
  const learningSection = (
    <SidebarGroup>
      <GroupLabel 
        label="Aprendizaje" 
        isExpanded={expanded.learning} 
        onClick={() => toggleGroup('learning')} 
      />
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
  );

  // 3. Sección Comunidad
  const communitySection = (
    <SidebarGroup>
      <GroupLabel 
        label="Comunidad" 
        isExpanded={expanded.community} 
        onClick={() => toggleGroup('community')} 
      />
      {expanded.community && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge="2" />
            <MenuItem to="/network" icon={Users} label="Red de Contactos" disabled={true} />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // 4. Sección Instructor
  const instructorSection = (
    <SidebarGroup>
      <GroupLabel 
        label="Enseñanza" 
        isExpanded={expanded.instructor} 
        onClick={() => toggleGroup('instructor')} 
      />
      {expanded.instructor && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/instructor/dashboard" icon={Presentation} label="Panel Instructor" />
            <MenuItem to="/instructor/courses" icon={BookOpen} label="Mis Cursos" />
            <MenuItem to="/instructor/students" icon={School} label="Estudiantes" />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // 5. Sección Administración
  const adminSection = (
    <SidebarGroup>
      <GroupLabel 
        label="Administración" 
        isExpanded={expanded.administration} 
        onClick={() => toggleGroup('administration')} 
      />
      {expanded.administration && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/admin/dashboard" icon={BarChart3} label="Dashboard" />
            <MenuItem to="/admin/users" icon={Users} label="Usuarios" />
            <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
            <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  // 6. Sección Cuenta
  const accountSection = (
    <SidebarGroup>
      <GroupLabel 
        label="Cuenta" 
        isExpanded={expanded.account} 
        onClick={() => toggleGroup('account')} 
      />
      {expanded.account && (
        <SidebarGroupContent>
          <SidebarMenu>
            <MenuItem to="/about-us" icon={Info} label="Acerca de Nosotros" />
            <MenuItem to="/help" icon={HelpCircle} label="Ayuda" disabled={true} />
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
          {generalSection}
          {learningSection}
          {communitySection}
          {instructorSection}
          {adminSection}
          {accountSection}
        </>
      );
      break;
    case 'instructor':
      menuContent = (
        <>
          {generalSection}
          {learningSection}
          {communitySection}
          {instructorSection}
          {accountSection}
        </>
      );
      break;
    default: // 'student' u otro rol
      menuContent = (
        <>
          {generalSection}
          {learningSection}
          {communitySection}
          {accountSection}
        </>
      );
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      {menuContent}
    </div>
  );
};

export default SidebarNavigation;
