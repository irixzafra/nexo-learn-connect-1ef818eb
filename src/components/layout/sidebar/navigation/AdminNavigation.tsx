
import React from 'react';
import { 
  Shield, 
  Users, 
  BookOpen, 
  Settings,
  CreditCard
} from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

interface AdminNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Administración"
      icon={Shield}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/admin/dashboard"
          icon={Shield}
          label="Panel Admin"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/users"
          icon={Users}
          label="Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/courses"
          icon={BookOpen}
          label="Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/billing"
          icon={CreditCard}
          label="Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/settings"
          icon={Settings}
          label="Configuración"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdminNavigation;
