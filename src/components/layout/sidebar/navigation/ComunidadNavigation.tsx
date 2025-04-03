
import React from 'react';
import { Users, MessageSquare, Newspaper, UsersRound, Rss, Trophy, Bell } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';
import { useNotifications } from '@/hooks/useNotifications';

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
  const { unreadCount: notificationsCount } = useNotifications();

  return (
    <SidebarGroup
      label="Comunidad"
      icon={Users}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/community"
          icon={Rss}
          label="Feed"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/community?tab=popular"
          icon={Newspaper}
          label="Popular"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/community?tab=leaderboard"
          icon={Trophy}
          label="Leaderboard"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/messages"
          icon={MessageSquare}
          label="Mensajes"
          badge={messagesCount}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/notifications"
          icon={Bell}
          label="Notificaciones"
          badge={notificationsCount}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/community?tab=groups"
          icon={UsersRound}
          label="Grupos"
          disabled={false}
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ComunidadNavigation;
