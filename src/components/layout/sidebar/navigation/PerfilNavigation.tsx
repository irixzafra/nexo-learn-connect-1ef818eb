
import React from 'react';
import { User, Bell, Award, Clock } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface PerfilNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  notificationsCount?: number;
}

const PerfilNavigation: React.FC<PerfilNavigationProps> = ({ 
  isOpen, 
  onToggle,
  notificationsCount = 0
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
          badge={notificationsCount}
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
