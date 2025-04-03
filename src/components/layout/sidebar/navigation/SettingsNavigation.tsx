
import React from 'react';
import { Settings, Database, Globe, PaintBucket, Bell, BarChart, Users, FileCode } from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface SettingsNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SettingsNavigation: React.FC<SettingsNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Configuración"
      icon={Settings}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/admin/settings"
          icon={Settings}
          label="General"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/features"
          icon={FileCode}
          label="Funcionalidades"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/design"
          icon={PaintBucket}
          label="Diseño"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/users"
          icon={Users}
          label="Usuarios"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/analytics"
          icon={BarChart}
          label="Analíticas"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/notifications"
          icon={Bell}
          label="Notificaciones"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/data"
          icon={Database}
          label="Datos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/admin/settings/localization"
          icon={Globe}
          label="Localización"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SettingsNavigation;
