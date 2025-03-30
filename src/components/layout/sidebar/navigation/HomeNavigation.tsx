
import React from 'react';
import { Home, Clock, BookOpen, Star } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

interface HomeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole?: UserRole;
}

const HomeNavigation: React.FC<HomeNavigationProps> = ({ isOpen, onToggle, userRole }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Determine "My Courses" link based on user role
  const myCoursesLink = userRole === 'instructor' ? '/instructor/courses' : '/my-courses';
  
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
          label="Dashboard"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to={myCoursesLink}
          icon={BookOpen}
          label="Mis Cursos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/recent-activity"
          icon={Clock}
          label="Actividad Reciente"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/favorites"
          icon={Star}
          label="Favoritos"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default HomeNavigation;
