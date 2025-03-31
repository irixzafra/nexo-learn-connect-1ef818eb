
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { MessageSquare, Users } from 'lucide-react';

interface CommunitySectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Comunidad" 
      icon={Users}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/messages" icon={MessageSquare} label="Mensajes" badge="2" />
      <MenuItem to="/network" icon={Users} label="Red de Contactos" disabled={true} />
    </SidebarGroup>
  );
};
