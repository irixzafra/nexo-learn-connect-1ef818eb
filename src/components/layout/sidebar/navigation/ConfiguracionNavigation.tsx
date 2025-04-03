
import React from 'react';
import { SlidersHorizontal, HelpCircle, Info } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface ConfiguracionNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ConfiguracionNavigation: React.FC<ConfiguracionNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Configuración"
      icon={SlidersHorizontal}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/settings"
          icon={SlidersHorizontal}
          label="Configuración"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/help"
          icon={HelpCircle}
          label="Ayuda / Soporte"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/about-us"
          icon={Info}
          label="Acerca de Nosotros"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ConfiguracionNavigation;
