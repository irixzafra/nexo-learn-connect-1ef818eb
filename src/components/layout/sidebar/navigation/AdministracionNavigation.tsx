
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Library, 
  Settings2, 
  KeyRound, 
  Shield, 
  CreditCard, 
  Database, 
  History, 
  FileText,
  Route,
  LineChart,
  Palette,
  BarChart3
} from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from '../MenuItems';

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
      icon={Shield}
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
        
        {/* Usuarios */}
        <MenuItem
          to="/admin/users"
          icon={Users}
          label="Usuarios"
          isCollapsed={isCollapsed}
        />
        
        {/* Educación */}
        <MenuItem
          to="/admin/courses"
          icon={Library}
          label="Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/learning-paths"
          icon={Route}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        
        {/* Design System */}
        <MenuItem
          to="/admin/design"
          icon={Palette}
          label="Diseño"
          isCollapsed={isCollapsed}
        />
        
        {/* Finanzas */}
        <MenuItem
          to="/admin/billing"
          icon={CreditCard}
          label="Facturación"
          isCollapsed={isCollapsed}
        />
        
        {/* Datos */}
        <MenuItem
          to="/admin/test-data"
          icon={Database}
          label="Datos de Prueba"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/audit-log"
          icon={History}
          label="Auditoría"
          isCollapsed={isCollapsed}
        />
        
        {/* Analíticas */}
        <MenuItem
          to="/admin/analytics"
          icon={BarChart3}
          label="Analíticas"
          isCollapsed={isCollapsed}
        />
        
        {/* Contenido */}
        <MenuItem
          to="/admin/content/categories"
          icon={FileText}
          label="Categorías"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/admin/pages"
          icon={FileText}
          label="Páginas"
          isCollapsed={isCollapsed}
        />
        
        {/* Configuración */}
        <MenuItem
          to="/admin/settings"
          icon={Settings2}
          label="Configuración"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AdministracionNavigation;
