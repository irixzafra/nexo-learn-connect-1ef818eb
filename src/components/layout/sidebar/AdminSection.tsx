
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { 
  BarChart3, 
  Users, 
  Settings,
  BookOpen,
  School,
  Shield,
  KeyRound
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
      <MenuItem to="/admin/roles" icon={KeyRound} label="Roles y Permisos" />
      
      {/* Gestión educativa */}
      <MenuItem to="/admin/courses" icon={BookOpen} label="Cursos" />
      <MenuItem to="/admin/instructors" icon={School} label="Instructores" />
      
      {/* Configuración */}
      <MenuItem to="/admin/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
