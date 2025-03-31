
import React from 'react';
import { cn } from '@/lib/utils';
import { useFeatureFlags } from '@/contexts/features/FeatureFlagsContext';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare, 
  User, 
  Calendar,
  BookOpen,
  Bell,
  Settings
} from 'lucide-react';

import SidebarNavItem from './SidebarNavItem';
import SidebarNavSection from './SidebarNavSection';

interface SidebarMainNavigationProps {
  effectiveRole: string;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  const { isFeatureEnabled } = useFeatureFlags();

  return (
    <div className={cn(
      "flex-1 overflow-auto py-2",
      isCollapsed ? "px-2" : "px-4"
    )}>
      {/* Sección Principal - Visible para todos */}
      <SidebarNavSection 
        title="Principal" 
        isCollapsed={isCollapsed}
      >
        <SidebarNavItem 
          to={getHomePath()} 
          icon={Home} 
          label="Inicio" 
          isCollapsed={isCollapsed} 
        />
        
        <SidebarNavItem 
          to="/courses" 
          icon={Compass} 
          label="Explorar" 
          isCollapsed={isCollapsed} 
        />
        
        {isFeatureEnabled('community') && (
          <SidebarNavItem 
            to="/community" 
            icon={Users} 
            label="Comunidad" 
            isCollapsed={isCollapsed} 
          />
        )}
        
        {isFeatureEnabled('messages') && (
          <SidebarNavItem 
            to="/messages" 
            icon={MessageSquare} 
            label="Mensajes" 
            badge={messagesCount} 
            isCollapsed={isCollapsed} 
          />
        )}
      </SidebarNavSection>
      
      {/* Sección Mi Aprendizaje - Visible para usuarios logueados */}
      <SidebarNavSection 
        title="Mi Aprendizaje" 
        isCollapsed={isCollapsed}
      >
        <SidebarNavItem 
          to="/my-courses" 
          icon={BookOpen} 
          label="Mis Cursos" 
          isCollapsed={isCollapsed} 
        />
        
        <SidebarNavItem 
          to="/calendar" 
          icon={Calendar} 
          label="Calendario" 
          isCollapsed={isCollapsed} 
        />
        
        <SidebarNavItem 
          to="/notifications" 
          icon={Bell} 
          label="Notificaciones" 
          badge={notificationsCount} 
          isCollapsed={isCollapsed} 
        />
      </SidebarNavSection>
      
      {/* Sección Cuenta - Visible para usuarios logueados */}
      <SidebarNavSection 
        title="Cuenta" 
        isCollapsed={isCollapsed}
      >
        <SidebarNavItem 
          to="/profile" 
          icon={User} 
          label="Perfil" 
          isCollapsed={isCollapsed} 
        />
        
        <SidebarNavItem 
          to="/settings" 
          icon={Settings} 
          label="Ajustes" 
          isCollapsed={isCollapsed} 
        />
      </SidebarNavSection>
    </div>
  );
};

export default SidebarMainNavigation;
