
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { 
  Server, 
  Shield, 
  Database, 
  Settings, 
  BarChart3, 
  Network, 
  Lock,
  HardDrive,
  Terminal,
  Cpu
} from 'lucide-react';

interface SistemasSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const SistemasSection: React.FC<SistemasSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Sistemas" 
      icon={Database}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/sistemas/dashboard" icon={BarChart3} label="Monitoreo" />
      <MenuItem to="/sistemas/servers" icon={Server} label="Servidores" />
      <MenuItem to="/sistemas/network" icon={Network} label="Red" />
      <MenuItem to="/sistemas/database" icon={Database} label="Base de Datos" />
      <MenuItem to="/sistemas/hardware" icon={HardDrive} label="Hardware" />
      <MenuItem to="/sistemas/console" icon={Terminal} label="Consola" />
      <MenuItem to="/sistemas/processors" icon={Cpu} label="Procesadores" />
      <MenuItem to="/sistemas/seguridad" icon={Shield} label="Seguridad" />
      <MenuItem to="/sistemas/access" icon={Lock} label="Control de Acceso" />
      <MenuItem to="/sistemas/config" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
