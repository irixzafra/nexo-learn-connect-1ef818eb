
import React from 'react';
import { BookOpen, GraduationCap, FileText, BookMarked } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
      icon={BookOpen}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/my-courses"
          icon={BookMarked}
          label="Mis Cursos"
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
          icon={FileText}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AprendizajeNavigation;
