
import React from 'react';
import { BookOpen, Compass, GraduationCap, Award, FileText } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface CursosNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CursosNavigation: React.FC<CursosNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Cursos"
      icon={BookOpen}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/courses"
          icon={Compass}
          label="Oferta Académica"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/learning-paths"
          icon={GraduationCap}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/certificates"
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/course-documents"
          icon={FileText}
          label="Documentos"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default CursosNavigation;
