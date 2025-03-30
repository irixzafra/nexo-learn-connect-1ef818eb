
import React from 'react';
import { Users, MessageSquare, Globe, Trophy, Handshake } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  messagesCount?: number;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ 
  isOpen, 
  onToggle,
  messagesCount = 0 
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
          to="/community/feed"
          icon={Globe}
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
          to="/leaderboard"
          icon={Trophy}
          label="Leaderboard"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/mentors"
          icon={Handshake}
          label="Mentores"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ComunidadNavigation;
