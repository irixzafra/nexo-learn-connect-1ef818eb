
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
        to={getHomePath()}
        icon={Home} 
        label="Inicio" 
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
          to="/app/dashboard"
          icon={LayoutDashboard}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        {effectiveRole === 'admin' && (
          <NavItem
            to="/app/admin/analytics"
            icon={Compass}
            label="Analíticas"
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
          to="/app/courses"
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/discover"
          icon={Compass}
          label="Descubrir Cursos"
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/calendar"
          icon={Calendar}
          label="Calendario"
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/resources"
          icon={FileText}
          label="Recursos"
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
            to="/app/instructor/dashboard"
            icon={LayoutDashboard}
            label="Panel Instructor"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/app/instructor/courses"
            icon={BookOpen}
            label="Mis Cursos"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/app/instructor/students"
            icon={Users}
            label="Estudiantes"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/app/instructor/content"
            icon={Video}
            label="Contenido"
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
          to="/app/messages"
          icon={MessageSquare}
          label="Mensajes"
          badge={messagesCount}
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/notifications"
          icon={Bell}
          label="Notificaciones"
          badge={notificationsCount}
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/forum"
          icon={Newspaper}
          label="Foro"
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
            to="/app/admin/dashboard"
            icon={Shield}
            label="Panel Admin"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/app/admin/users"
            icon={Users}
            label="Usuarios"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/app/admin/courses"
            icon={BookOpen}
            label="Gestión Cursos"
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
          to="/app/docs"
          icon={FileText}
          label="Documentación"
          isCollapsed={isCollapsed}
        />
        <NavItem
          to="/app/help"
          icon={Lightbulb}
          label="Ayuda"
          isCollapsed={isCollapsed}
        />
      </NavGroup>

      {/* Settings - at the bottom */}
      <NavItem
        to="/app/settings"
        icon={Settings}
        label="Configuración"
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default SidebarMainNavigation;
