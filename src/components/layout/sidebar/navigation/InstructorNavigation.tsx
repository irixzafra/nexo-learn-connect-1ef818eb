
import React from 'react';
import { GraduationCap, Users, BookOpen, Award, LineChart } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface InstructorNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const InstructorNavigation: React.FC<InstructorNavigationProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Instructor"
      icon={GraduationCap}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/instructor/dashboard"
          icon={LineChart}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/instructor/courses"
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/instructor/students"
          icon={Users}
          label="Estudiantes"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/instructor/certificates"
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default InstructorNavigation;
