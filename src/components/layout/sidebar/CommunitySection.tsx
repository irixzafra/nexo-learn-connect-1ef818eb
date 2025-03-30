
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { MessageSquare, Users, Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface CommunitySectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ expanded, onToggle }) => {
  const { unreadCount } = useNotifications();
  
  return (
    <SidebarGroup 
      label="Comunidad" 
      icon={Users}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge={unreadCount > 0 ? unreadCount.toString() : undefined} />
      <MenuItem to="/notifications" icon={Bell} label="Notificaciones" />
      <MenuItem to="/network" icon={Users} label="Red de Contactos" disabled={true} />
    </SidebarGroup>
  );
};
