
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
      <MenuItem to="/app/scholarships" icon={FileText} label="Becas" />
      <MenuItem to="/app/profile" icon={UserCog} label="Mi Perfil" />
      <MenuItem to="/app/settings" icon={Settings} label="Configuración" />
    </SidebarGroup>
  );
};

export default LearningSection;
