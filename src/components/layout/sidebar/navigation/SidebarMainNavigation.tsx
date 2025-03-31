
import React from 'react';
import { UserRoleType } from '@/types/auth';
import { 
  Home, 
  Compass, 
  Users, 
  MessageSquare,
  Shield,
  User,
  Phone,
  AppWindow
} from 'lucide-react';

// Importamos los componentes de navegación
import SidebarNavSection from './SidebarNavSection';
import SidebarNavItem from './SidebarNavItem';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  getHomePath
}) => {
  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        <SidebarNavSection title="Navegación" isCollapsed={isCollapsed}>
          <SidebarNavItem 
            to="/" 
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
          <SidebarNavItem 
            to="/community" 
            icon={Users} 
            label="Comunidad" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/messages" 
            icon={MessageSquare} 
            label="Mensajes" 
            badge={messagesCount > 0 ? messagesCount : undefined} 
            isCollapsed={isCollapsed} 
          />
          {(effectiveRole === 'admin' || effectiveRole === 'instructor') && (
            <SidebarNavItem 
              to="/admin/dashboard" 
              icon={Shield} 
              label="Administración" 
              isCollapsed={isCollapsed} 
            />
          )}
          <SidebarNavItem 
            to="/profile" 
            icon={User} 
            label="Perfil" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/contact" 
            icon={Phone} 
            label="Contacto" 
            isCollapsed={isCollapsed} 
          />
          <SidebarNavItem 
            to="/landing" 
            icon={AppWindow} 
            label="Landing Page" 
            isCollapsed={isCollapsed} 
          />
        </SidebarNavSection>
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
