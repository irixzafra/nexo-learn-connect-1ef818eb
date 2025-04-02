
import React from 'react';
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
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
          to="/instructor/dashboard"
          icon={GraduationCap}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/instructor/courses"
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/instructor/students"
          icon={Users}
          label="Estudiantes"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/instructor/certificates"
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default ProfesorNavigation;
