
import React from 'react';
import { User, Bell, Award, Clock } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';
import { useNotifications } from '@/hooks/useNotifications';

interface PerfilNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const PerfilNavigation: React.FC<PerfilNavigationProps> = ({ 
  isOpen, 
  onToggle
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount } = useNotifications();

  return (
    <SidebarGroup
      label="Perfil"
      icon={User}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/profile"
          icon={User}
          label="Mi Perfil"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/notifications"
          icon={Bell}
          label="Notificaciones"
          badge={unreadCount}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/achievements"
          icon={Award}
          label="Mis Logros"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/history"
          icon={Clock}
          label="Historial"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default PerfilNavigation;
