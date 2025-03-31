
import React from 'react';
import { SlidersHorizontal, HelpCircle, Info, Construction } from 'lucide-react';
import { 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';
import { Badge } from '@/components/ui/badge';

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
          to="/settings"
          icon={SlidersHorizontal}
          label="Configuración"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/help"
          icon={HelpCircle}
          label={
            <>
              Ayuda / Soporte
              <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 text-xs border-amber-200">
                En desarrollo
              </Badge>
            </>
          }
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/about-us"
          icon={Info}
          label={
            <>
              Acerca de Nosotros
              <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 text-xs border-amber-200">
                En desarrollo
              </Badge>
            </>
          }
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ConfiguracionNavigation;
