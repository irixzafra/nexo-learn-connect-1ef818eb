
import React from 'react';
import { Settings, LayoutDashboard, Users, Library, CreditCard, Database, Settings2, KeyRound, History } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

interface AdministracionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdministracionNavigation: React.FC<AdministracionNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Administración"
      icon={Settings}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/admin/dashboard"
          icon={LayoutDashboard}
          label="Panel Admin"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/users"
          icon={Users}
          label="Gestionar Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/courses"
          icon={Library}
          label="Gestionar Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/billing"
          icon={CreditCard}
          label="Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/test-data"
          icon={Database}
          label="Datos de Prueba"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/settings"
          icon={Settings2}
          label="Configuración Plataforma"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/roles"
          icon={KeyRound}
          label="Roles y Permisos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/audit-log"
          icon={History}
          label="Auditoría"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdministracionNavigation;
