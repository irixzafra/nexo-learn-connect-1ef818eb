
import React from 'react';
import { GraduationCap, Users, BookOpen, Award, LineChart } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface ProfesorNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ProfesorNavigation: React.FC<ProfesorNavigationProps> = ({ 
  isOpen, 
  onToggle 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Profesor"
      icon={GraduationCap}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/profesor/dashboard"
          icon={LineChart}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/profesor/courses"
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/profesor/students"
          icon={Users}
          label="Estudiantes"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/app/profesor/certificates"
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ProfesorNavigation;
