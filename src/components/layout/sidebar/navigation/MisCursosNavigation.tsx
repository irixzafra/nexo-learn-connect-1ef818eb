
import React from 'react';
import { BookOpen } from 'lucide-react';
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
      icon={BookOpen}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/my-courses"
          icon={BookOpen}
          label="Todos Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/my-courses/in-progress"
          icon={BookOpen}
          label="En Progreso"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/my-courses/completed"
          icon={BookOpen}
          label="Completados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default MisCursosNavigation;
