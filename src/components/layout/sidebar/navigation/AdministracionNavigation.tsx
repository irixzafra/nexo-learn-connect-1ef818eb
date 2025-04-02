
import React from 'react';
import { Shield } from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';
import { adminNavigation, filterMenuItemsByRole } from '@/config/menuConfig';
import { UserRoleType } from '@/types/auth';

interface AdministracionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRoleType;
}

const AdministracionNavigation: React.FC<AdministracionNavigationProps> = ({ 
  isOpen, 
  onToggle,
  userRole 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Filtrar ítems de navegación según el rol del usuario
  const filteredItems = filterMenuItemsByRole(adminNavigation, userRole);

  return (
    <SidebarGroup
      label="Administración"
      icon={Shield}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        {filteredItems.map(item => (
          <MenuItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdministracionNavigation;
