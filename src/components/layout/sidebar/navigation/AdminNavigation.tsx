
import React from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Layers, 
  FileText, 
  BarChart3, 
  CreditCard,
  ClipboardX
} from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';
import { routeMap } from '@/utils/routeUtils';

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
          to={routeMap.adminDashboard}
          icon={BarChart3}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={routeMap.adminUsers}
          icon={Users}
          label="Gestión de Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={routeMap.adminCourses}
          icon={Layers}
          label="Gestión de Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={routeMap.adminSystemPages}
          icon={FileText}
          label="Páginas CMS"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/payments"
          icon={CreditCard}
          label="Pagos y Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={routeMap.adminReviewElements}
          icon={ClipboardX}
          label="Revisión Elementos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={routeMap.adminSettings}
          icon={Settings}
          label="Configuración del Sistema"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdminNavigation;
