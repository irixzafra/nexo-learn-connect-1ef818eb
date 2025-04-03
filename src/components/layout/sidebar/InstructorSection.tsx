
import React from 'react';
import { SidebarGroup } from './SidebarGroup';
import { MenuItem } from './MenuItems';
import { Presentation, BookOpen, School, ClipboardList, BarChart, MessageSquare } from 'lucide-react';

interface InstructorSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ expanded, onToggle }) => {
  return (
    <SidebarGroup 
      label="Enseñanza" 
      icon={Presentation}
      isExpanded={expanded} 
      onToggle={onToggle}
    >
      <MenuItem to="/app/instructor/dashboard" icon={Presentation} label="Panel Instructor" />
      <MenuItem to="/app/instructor/courses" icon={BookOpen} label="Mis Cursos" />
      <MenuItem to="/app/instructor/students" icon={School} label="Estudiantes" />
      <MenuItem to="/app/instructor/assignments" icon={ClipboardList} label="Notas y Tareas" />
      <MenuItem to="/app/instructor/messages" icon={MessageSquare} label="Mensajes" />
      <MenuItem to="/app/instructor/analytics" icon={BarChart} label="Analíticas" />
    </SidebarGroup>
  );
};
