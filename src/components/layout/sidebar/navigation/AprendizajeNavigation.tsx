
import React from 'react';
import { BookOpen, Award, GraduationCap, Lightbulb } from 'lucide-react';
import MenuItem from '@/components/layout/sidebar/navigation/common/MenuItem';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarMenu } from '@/components/ui/sidebar';
import { SidebarGroup } from '../SidebarGroup';

interface AprendizajeNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AprendizajeNavigation: React.FC<AprendizajeNavigationProps> = ({ 
  isOpen,
  onToggle 
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Aprendizaje"
      icon={GraduationCap}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/learning-paths"
          icon={BookOpen}
          label="Rutas de Aprendizaje"
          isCollapsed={isCollapsed}
        />
        <MenuItem
          to="/app/certificates"
          icon={Award}
          label="Certificados"
          isCollapsed={isCollapsed}
        />
        <MenuItem
          to="/app/recommendations"
          icon={Lightbulb}
          label="Recomendaciones"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default AprendizajeNavigation;
