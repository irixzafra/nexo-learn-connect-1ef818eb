
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
  Video
} from 'lucide-react';
import { UserRoleType } from '@/types/auth';
import { NavItem, NavGroup, NavDivider } from '@/components/navigation';

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
        
        {effectiveRole === 'admin' && (
          <NavItem
            href="/app/admin/analytics"
            icon={Compass}
            title="Analíticas"
            isCollapsed={isCollapsed}
          />
        )}
      </NavGroup>

      {/* Learning Group */}
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
          href="/app/calendar"
          icon={Calendar}
          title="Calendario"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/resources"
          icon={FileText}
          title="Recursos"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Teaching Group - only for instructor role */}
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

      {/* Community Group */}
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
          badge={messagesCount}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/notifications"
          icon={Bell}
          title="Notificaciones"
          badge={notificationsCount}
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/forum"
          icon={Newspaper}
          title="Foro"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Admin Group - only for admin role */}
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
        </NavGroup>
      )}

      {/* Resources Group - at the bottom */}
      <NavDivider />
      
      <NavGroup
        title="Recursos"
        icon={Github}
        defaultExpanded={expandedGroups.resources}
        isCollapsed={isCollapsed}
      >
        <NavItem
          href="/app/docs"
          icon={FileText}
          title="Documentación"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/app/help"
          icon={Lightbulb}
          title="Ayuda"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Settings - at the bottom */}
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
