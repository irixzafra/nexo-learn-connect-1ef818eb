
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { BarChart3, Users, Database, CreditCard, UserCog } from 'lucide-react';

interface AdminSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Administración" 
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/admin/dashboard" icon={BarChart3} label="Dashboard" />
      <MenuItem to="/admin/users" icon={Users} label="Usuarios" />
      <MenuItem to="/admin/roles" icon={UserCog} label="Roles y Permisos" />
      <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
      <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
    </SidebarGroup>
  );
};
