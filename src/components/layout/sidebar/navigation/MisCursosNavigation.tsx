
import React from 'react';
import { Book, ListChecks, Clock, GraduationCap } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface MisCursosNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MisCursosNavigation: React.FC<MisCursosNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Mis Cursos"
      icon={Book}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/my-courses"
          icon={Book}
          label="Todos Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/my-courses/in-progress"
          icon={Clock}
          label="En Progreso"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/my-courses/completed"
          icon={ListChecks}
          label="Completados"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/my-courses/certificates"
          icon={GraduationCap}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MisCursosNavigation;
