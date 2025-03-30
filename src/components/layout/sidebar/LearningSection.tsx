
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { FileText, UserCog, Settings, Lightbulb } from 'lucide-react';

interface LearningSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const LearningSection: React.FC<LearningSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Aprendizaje" 
      icon={Lightbulb}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/scholarships" icon={FileText} label="Becas" />
      <MenuItem to="/profile" icon={UserCog} label="Mi Perfil" />
      <MenuItem to="/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};
