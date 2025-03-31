
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
  FileText,
  Folder,
  Route,
  LineChart
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
      <MenuItem to="/admin/learning-paths" icon={Route} label="Rutas de Aprendizaje" />
      
      {/* Gestión de contenido */}
      <MenuItem to="/admin/content" icon={Folder} label="Contenido" />
      <MenuItem to="/admin/pages" icon={FileText} label="Páginas" />
      
      {/* Gestión de pagos */}
      <MenuItem to="/admin/billing" icon={CreditCard} label="Facturación" />
      
      {/* Datos y configuración */}
      <MenuItem to="/admin/test-data" icon={Database} label="Datos de Prueba" />
      <MenuItem to="/admin/audit-log" icon={History} label="Auditoría" />
      
      {/* Análiticas */}
      <MenuItem to="/admin/analytics" icon={LineChart} label="Analíticas" />
      
      {/* Configuración */}
      <MenuItem to="/admin/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
