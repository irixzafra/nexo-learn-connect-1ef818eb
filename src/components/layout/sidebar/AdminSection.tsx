
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { 
  BarChart3, 
  Users, 
  Database, 
  CreditCard, 
  UserCog,
  Settings,
  BookOpen,
  School,
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
      <MenuItem to="/admin/dashboard" icon={BarChart3} label="Dashboard" />
      
      {/* Gestión de usuarios */}
      <MenuItem to="/admin/users" icon={Users} label="Usuarios" />
      <MenuItem to="/admin/roles" icon={UserCog} label="Roles y Permisos" />
      <MenuItem to="/admin/access" icon={Shield} label="Control de Acceso" />
      
      {/* Gestión educativa */}
      <MenuItem to="/admin/courses" icon={BookOpen} label="Cursos" />
      <MenuItem to="/admin/instructors" icon={School} label="Instructores" />
      
      {/* Datos y finanzas */}
      <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
      <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
      <MenuItem to="/admin/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
