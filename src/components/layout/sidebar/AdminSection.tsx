
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
  KeyRound,
  CreditCard,
  Database,
  History,
  FileText
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
      
      {/* Gestión de pagos */}
      <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
      
      {/* Datos y configuración */}
      <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
      <MenuItem to="/admin/categories" icon={FileText} label="Categorías" />
      <MenuItem to="/admin/audit-log" icon={History} label="Auditoría" />
      
      {/* Configuración */}
      <MenuItem to="/admin/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
