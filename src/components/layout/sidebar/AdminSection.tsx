
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  BookOpen,
  CreditCard,
  Database,
  Shield
} from 'lucide-react';

interface AdminSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Administración" 
      icon={Shield}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      {/* Dashboard */}
      <MenuItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
      
      {/* Usuarios */}
      <MenuItem to="/admin/users" icon={Users} label="Usuarios" />
      
      {/* Cursos */}
      <MenuItem to="/admin/courses" icon={BookOpen} label="Cursos" />
      
      {/* Finanzas */}
      <MenuItem to="/admin/finanzas" icon={CreditCard} label="Finanzas" />
      
      {/* Datos */}
      <MenuItem to="/admin/test-data" icon={Database} label="Datos" />
      
      {/* Configuración */}
      <MenuItem to="/admin/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
