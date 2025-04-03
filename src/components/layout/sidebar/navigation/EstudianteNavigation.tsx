
import React from 'react';
import { GraduationCap, BookOpen, Lightbulb, Trophy, Calendar } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface EstudianteNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const EstudianteNavigation: React.FC<EstudianteNavigationProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Aprendizaje"
      icon={GraduationCap}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/student/dashboard"
          icon={GraduationCap}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/student/courses"
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/student/learning-paths"
          icon={Lightbulb}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/student/achievements"
          icon={Trophy}
          label="Logros y Certificados"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/student/calendar"
          icon={Calendar}
          label="Calendario Académico"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default EstudianteNavigation;
