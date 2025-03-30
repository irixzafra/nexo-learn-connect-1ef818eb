
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { Home, Compass, BookOpen, Calendar } from 'lucide-react';

interface GeneralSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Principal" 
      icon={Home}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/home" icon={Home} label="Inicio" />
      <MenuItem to="/courses" icon={Compass} label="Explorar Cursos" />
      <MenuItem to="/my-courses" icon={BookOpen} label="Mis Cursos" />
      <MenuItem to="/calendar" icon={Calendar} label="Calendario" />
    </SidebarGroup>
  );
};
