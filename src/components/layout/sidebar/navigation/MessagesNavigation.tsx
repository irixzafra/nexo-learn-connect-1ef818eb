
import React from 'react';
import { MessageSquare, Mail, Users, Star } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface MessagesNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MessagesNavigation: React.FC<MessagesNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Mensajes"
      icon={MessageSquare}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/messages"
          icon={MessageSquare}
          label="Chats"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/messages/inbox"
          icon={Mail}
          label="Bandeja de entrada"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/messages/groups"
          icon={Users}
          label="Grupos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/messages/important"
          icon={Star}
          label="Destacados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MessagesNavigation;
