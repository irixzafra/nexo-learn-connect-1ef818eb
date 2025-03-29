
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { Server, Shield, Database, Settings } from 'lucide-react';

interface SistemasSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const SistemasSection: React.FC<SistemasSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Sistemas" 
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/sistemas/servers" icon={Server} label="Servidores" />
      <MenuItem to="/sistemas/seguridad" icon={Shield} label="Seguridad" />
      <MenuItem to="/sistemas/database" icon={Database} label="Base de Datos" />
      <MenuItem to="/sistemas/config" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
