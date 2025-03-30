
import React from 'react';
import { Users, MessageSquare, Newspaper, UsersRound } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from '../MenuItems';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  messagesCount?: number;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ 
  isOpen, 
  onToggle,
  messagesCount = 2 // Valor predeterminado para mostrar notificaciones
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Comunidad"
      icon={Users}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/community"
          icon={Newspaper}
          label="Feed"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/messages"
          icon={MessageSquare}
          label="Mensajes"
          badge={messagesCount}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/network"
          icon={UsersRound}
          label="Red de Contactos"
          disabled={true}
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ComunidadNavigation;
