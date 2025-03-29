
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { Presentation, BookOpen, School } from 'lucide-react';

interface InstructorSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Enseñanza" 
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/instructor/dashboard" icon={Presentation} label="Panel Instructor" />
      <MenuItem to="/instructor/courses" icon={BookOpen} label="Mis Cursos" />
      <MenuItem to="/instructor/students" icon={School} label="Estudiantes" />
    </SidebarGroup>
  );
};
