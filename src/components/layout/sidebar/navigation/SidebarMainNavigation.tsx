
import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Users,
  Shield,
  Settings,
  MessageSquare,
  Bell,
  Compass,
  Calendar,
  FileText,
  Presentation,
  Lightbulb,
  Newspaper,
  Github,
  Video,
  BarChart3,
  CreditCard,
  ClipboardEdit,
  Code,
  FileQuestion,
  PanelLeft,
  HelpCircle,
  Award,
  Map,
  FolderOpen,
  BookMarked
} from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { NavItem, NavGroup, NavDivider } from '@/components/navigation';
import { routeMap } from '@/utils/routeUtils';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
  getHomePath: () => string;
  isCollapsed?: boolean;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  messagesCount = 0,
  notificationsCount = 0,
  getHomePath,
  isCollapsed = false
}) => {
  // Store navigation categories and their expanded state
  const [expandedGroups, setExpandedGroups] = useState({
    dashboard: true,
    learning: true,
    teaching: effectiveRole === 'instructor',
    community: false,
    admin: effectiveRole === 'admin',
    settings: false,
    resources: false
  });

  // Function to toggle navigation group expansion
  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="space-y-1">
      {/* Home link - always visible */}
      <NavItem 
        href={getHomePath()}
        icon={Home} 
        title="Inicio" 
        isCollapsed={isCollapsed}
      />

      <NavDivider />

      {/* Dashboard Group */}
      <NavGroup
        title="Dashboard"
        icon={LayoutDashboard}
        defaultExpanded={expandedGroups.dashboard}
        isCollapsed={isCollapsed}
      >
        <NavItem
          href="/app/dashboard"
          icon={LayoutDashboard}
          title="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        {(effectiveRole === 'admin' || effectiveRole === 'sistemas') && (
          <NavItem
            href="/app/admin/analytics"
            icon={BarChart3}
            title="Analíticas"
            isCollapsed={isCollapsed}
          />
        )}
      </NavGroup>

      {/* Learning Group - for all users */}
      <NavGroup
        title="Aprendizaje"
        icon={Lightbulb}
        defaultExpanded={expandedGroups.learning}
        isCollapsed={isCollapsed}
      >
        <NavItem
          href="/app/courses"
          icon={BookOpen}
          title="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/discover"
          icon={Compass}
          title="Descubrir Cursos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/learning-paths"
          icon={Map}
          title="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/calendar"
          icon={Calendar}
          title="Calendario"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/resources"
          icon={FolderOpen}
          title="Recursos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/certificates"
          icon={Award}
          title="Certificados"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Teaching Group - only for instructor and admin roles */}
      {(effectiveRole === 'instructor' || effectiveRole === 'admin') && (
        <NavGroup
          title="Enseñanza"
          icon={Presentation}
          defaultExpanded={expandedGroups.teaching}
          isCollapsed={isCollapsed}
        >
          <NavItem
            href="/app/instructor/dashboard"
            icon={LayoutDashboard}
            title="Panel Instructor"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/instructor/courses"
            icon={BookOpen}
            title="Mis Cursos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/instructor/students"
            icon={Users}
            title="Estudiantes"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/instructor/content"
            icon={Video}
            title="Contenido"
            isCollapsed={isCollapsed}
          />
        </NavGroup>
      )}

      {/* Community Group - for all users */}
      <NavGroup
        title="Comunidad"
        icon={Users}
        defaultExpanded={expandedGroups.community}
        isCollapsed={isCollapsed}
      >
        <NavItem
          href="/app/messages"
          icon={MessageSquare}
          title="Mensajes"
          badge={messagesCount > 0 ? messagesCount : undefined}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/notifications"
          icon={Bell}
          title="Notificaciones"
          badge={notificationsCount > 0 ? notificationsCount : undefined}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/forum"
          icon={Newspaper}
          title="Foro"
          isCollapsed={isCollapsed}
        />
        
        {/* Nuevo ítem para moderadores - Revisión de contenido */}
        {effectiveRole === 'moderator' && (
          <NavItem
            href="/app/moderator/content-review"
            icon={ClipboardEdit}
            title="Revisión de Contenido"
            isCollapsed={isCollapsed}
          />
        )}
      </NavGroup>

      {/* Admin Group - only for admin and sistemas roles */}
      {(effectiveRole === 'admin' || effectiveRole === 'sistemas') && (
        <NavGroup
          title="Administración"
          icon={Shield}
          defaultExpanded={expandedGroups.admin}
          isCollapsed={isCollapsed}
        >
          <NavItem
            href="/app/admin/dashboard"
            icon={Shield}
            title="Panel Admin"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/admin/users"
            icon={Users}
            title="Usuarios"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/admin/courses"
            icon={BookOpen}
            title="Gestión Cursos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/admin/review-elements"
            icon={ClipboardEdit}
            title="Revisión Elementos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/admin/design-system"
            icon={PanelLeft}
            title="Sistema de Diseño"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/app/admin/navigation-diagram"
            icon={FileText}
            title="Diagrama de Navegación"
            isCollapsed={isCollapsed}
          />
          {effectiveRole === 'sistemas' && (
            <NavItem
              href="/app/admin/system"
              icon={Code}
              title="Configuración Sistema"
              isCollapsed={isCollapsed}
            />
          )}
          <NavItem
            href="/app/admin/payments"
            icon={CreditCard}
            title="Pagos"
            isCollapsed={isCollapsed}
          />
        </NavGroup>
      )}

      {/* Resources Group - for all users */}
      <NavDivider />
      
      <NavGroup
        title="Recursos"
        icon={Github}
        defaultExpanded={expandedGroups.resources}
        isCollapsed={isCollapsed}
      >
        <NavItem
          href="/app/docs"
          icon={BookMarked}
          title="Documentación"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/help"
          icon={HelpCircle}
          title="Ayuda"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/certificates/verification-portal"
          icon={Award}
          title="Verificar Certificados"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Settings - at the bottom for all users */}
      <NavItem
        href="/app/settings"
        icon={Settings}
        title="Configuración"
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default SidebarMainNavigation;
