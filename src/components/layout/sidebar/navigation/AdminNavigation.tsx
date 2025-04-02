
import React from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Layers, 
  FileText, 
  BarChart3, 
  CreditCard
} from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface AdminNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ 
  isOpen, 
  onToggle 
}) => {
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
          icon={BarChart3}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/users"
          icon={Users}
          label="Gestión de Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/courses"
          icon={Layers}
          label="Gestión de Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/reports"
          icon={FileText}
          label="Informes"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/payments"
          icon={CreditCard}
          label="Pagos y Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/settings"
          icon={Settings}
          label="Configuración del Sistema"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdminNavigation;
