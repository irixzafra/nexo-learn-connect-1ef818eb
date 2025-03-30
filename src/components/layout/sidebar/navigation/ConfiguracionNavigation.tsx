
import React from 'react';
import { Settings, Key, CreditCard, HelpCircle, Info } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

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
      icon={Settings}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/settings"
          icon={Settings}
          label="Preferencias"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/settings/account"
          icon={Key}
          label="Cuenta"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/settings/billing"
          icon={CreditCard}
          label="Facturación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/help"
          icon={HelpCircle}
          label="Ayuda"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/about-us"
          icon={Info}
          label="Acerca de"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ConfiguracionNavigation;
