
import React from 'react';
import { Home, Compass, BookOpen } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';
import { UserRole } from '@/types/auth';

interface HomeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRole;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ isOpen, onToggle, userRole }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const myCoursesPath = userRole === 'instructor' ? '/instructor/courses' : '/my-courses';

  return (
    <SidebarGroup
      label="Inicio"
      icon={Home}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/home"
          icon={Home}
          label="Inicio"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/courses"
          icon={Compass}
          label="Explorar Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={myCoursesPath}
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default HomeNavigation;
