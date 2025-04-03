
import React, { useState } from 'react';
import { 
  Home, 
  LayoutDashboard, 
  BookOpen, 
  Users,
  Shield,
  Settings,
  MessageSquare,
  Bell
} from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import MenuItem from './common/MenuItem';
import { UserRoleType } from '@/types/auth';
import { SidebarGroup } from '../SidebarGroup';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  messagesCount = 0,
  notificationsCount = 0,
  getHomePath
}) => {
  // Expanded state for navigation groups
  const [expandedGroups, setExpandedGroups] = useState({
    dashboard: true,
    courses: true,
    community: false,
    admin: effectiveRole === 'admin',
    settings: false
  });

  // Toggle function for expanding/collapsing groups
  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className="px-1 space-y-2">
      {/* Home link - always visible */}
      <SidebarMenu>
        <MenuItem 
          to={getHomePath()}
          icon={Home} 
          label="Inicio" 
          isCollapsed={false}
        />
      </SidebarMenu>

      {/* Dashboard Group */}
      <SidebarGroup
        label="Dashboard"
        icon={LayoutDashboard}
        isExpanded={expandedGroups.dashboard}
        onToggle={() => toggleGroup('dashboard')}
      >
        <SidebarMenu>
          <MenuItem
            to="/app/dashboard"
            icon={LayoutDashboard}
            label="Panel Principal"
            isCollapsed={false}
          />
        </SidebarMenu>
      </SidebarGroup>

      {/* Courses Group */}
      <SidebarGroup
        label="Cursos"
        icon={BookOpen}
        isExpanded={expandedGroups.courses}
        onToggle={() => toggleGroup('courses')}
      >
        <SidebarMenu>
          <MenuItem
            to="/app/courses"
            icon={BookOpen}
            label="Mis Cursos"
            isCollapsed={false}
          />
        </SidebarMenu>
      </SidebarGroup>

      {/* Community Group */}
      <SidebarGroup
        label="Comunidad"
        icon={Users}
        isExpanded={expandedGroups.community}
        onToggle={() => toggleGroup('community')}
      >
        <SidebarMenu>
          <MenuItem
            to="/app/messages"
            icon={MessageSquare}
            label="Mensajes"
            badge={messagesCount}
            isCollapsed={false}
          />
          <MenuItem
            to="/app/notifications"
            icon={Bell}
            label="Notificaciones"
            badge={notificationsCount}
            isCollapsed={false}
          />
        </SidebarMenu>
      </SidebarGroup>

      {/* Admin Group - only for admin role */}
      {(effectiveRole === 'admin' || effectiveRole === 'sistemas') && (
        <SidebarGroup
          label="Administración"
          icon={Shield}
          isExpanded={expandedGroups.admin}
          onToggle={() => toggleGroup('admin')}
        >
          <SidebarMenu>
            <MenuItem
              to="/app/admin/dashboard"
              icon={Shield}
              label="Panel Admin"
              isCollapsed={false}
            />
            <MenuItem
              to="/app/admin/users"
              icon={Users}
              label="Usuarios"
              isCollapsed={false}
            />
          </SidebarMenu>
        </SidebarGroup>
      )}

      {/* Settings Group */}
      <SidebarGroup
        label="Configuración"
        icon={Settings}
        isExpanded={expandedGroups.settings}
        onToggle={() => toggleGroup('settings')}
      >
        <SidebarMenu>
          <MenuItem
            to="/app/settings"
            icon={Settings}
            label="Configuración"
            isCollapsed={false}
          />
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
};

export default SidebarMainNavigation;
