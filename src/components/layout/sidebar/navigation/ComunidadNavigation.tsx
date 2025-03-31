
import React from 'react';
import { Users, MessageSquare, Newspaper, UsersRound, Rss, Trophy, Bell } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from '../MenuItems';
import { useNotifications } from '@/hooks/useNotifications';

interface ComunidadNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ComunidadNavigation: React.FC<ComunidadNavigationProps> = ({ 
  isOpen, 
  onToggle
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { unreadCount: notificationsCount } = useNotifications();
  
  // This is a placeholder - in a real implementation, you would fetch the unread messages count
  const messagesCount = 2;

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
          icon={Rss}
          label="Feed"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/community?tab=popular"
          icon={Newspaper}
          label="Popular"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/community?tab=leaderboard"
          icon={Trophy}
          label="Leaderboard"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/messages"
          icon={MessageSquare}
          label="Mensajes"
          badge={messagesCount > 0 ? messagesCount.toString() : undefined}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/notifications"
          icon={Bell}
          label="Notificaciones"
          badge={notificationsCount > 0 ? notificationsCount.toString() : undefined}
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/community?tab=groups"
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
