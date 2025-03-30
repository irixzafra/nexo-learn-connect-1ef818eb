
import React from 'react';
import { ShieldAlert, Users2, PieChart, CreditCard, Landmark, FileText } from 'lucide-react';
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
      icon={ShieldAlert}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/admin/dashboard"
          icon={PieChart}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/users"
          icon={Users2}
          label="Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/payments"
          icon={CreditCard}
          label="Pagos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/billing"
          icon={Landmark}
          label="Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/reports"
          icon={FileText}
          label="Reportes"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdministracionNavigation;
