
import React from 'react';
import { Settings, User, Bell, Lock } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface SettingsNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Configuración"
      icon={Settings}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/settings"
          icon={Settings}
          label="General"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/settings/profile"
          icon={User}
          label="Perfil"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/settings/notifications"
          icon={Bell}
          label="Notificaciones"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/settings/security"
          icon={Lock}
          label="Seguridad"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SettingsNavigation;
