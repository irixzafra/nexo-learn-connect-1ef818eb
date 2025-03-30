
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { 
  Users, 
  MessageSquare,
  Heart,
  Megaphone,
  Newspaper,
  Briefcase,
  Calendar
} from 'lucide-react';

interface CommunitySectionProps {
  expanded: boolean;
  onToggle: () => void;
  messagesCount?: number;
  notificationsCount?: number;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ 
  expanded, 
  onToggle,
  messagesCount = 0,
  notificationsCount = 0
}) => {
  return (
    <SidebarGroup 
      label="Comunidad" 
      icon={Users}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/comunidad/foros" icon={Newspaper} label="Foros" />
      <MenuItem to="/comunidad/grupos" icon={Users} label="Grupos" />
      <MenuItem to="/comunidad/mensajes" icon={MessageSquare} label="Mensajes" badge={messagesCount} />
      <MenuItem to="/comunidad/eventos" icon={Calendar} label="Eventos" />
      <MenuItem to="/comunidad/empleos" icon={Briefcase} label="Empleos" />
      <MenuItem to="/comunidad/anuncios" icon={Megaphone} label="Anuncios" badge={notificationsCount} />
    </SidebarGroup>
  );
};
