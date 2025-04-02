
import React from 'react';
import { ClipboardList, UserCog, BarChart3, Settings } from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';
import { UserRoleType } from '@/types/auth';

interface GestionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  role: UserRoleType;
}

const GestionNavigation: React.FC<GestionNavigationProps> = ({ 
  isOpen, 
  onToggle,
  role 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Gestión"
      icon={ClipboardList}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/management/users"
          icon={UserCog}
          label="Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/management/reports"
          icon={BarChart3}
          label="Reportes"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/management/settings"
          icon={Settings}
          label="Configuración"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default GestionNavigation;
