
import React from 'react';
import { Lightbulb, FileText, BookOpen, Award } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface AprendizajeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AprendizajeNavigation: React.FC<AprendizajeNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Aprendizaje"
      icon={Lightbulb}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/learning/paths"
          icon={FileText}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/learning/resources"
          icon={BookOpen}
          label="Recursos Educativos"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/learning/achievements"
          icon={Award}
          label="Mis Logros"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AprendizajeNavigation;
