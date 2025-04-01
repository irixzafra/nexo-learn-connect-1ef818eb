
import React from 'react';
import { Award, Trophy, Star, BarChart } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface GamificationNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const GamificationNavigation: React.FC<GamificationNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Gamificación"
      icon={Award}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/profile/achievements"
          icon={Trophy}
          label="Mis Logros"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/leaderboard"
          icon={BarChart}
          label="Tabla de Posiciones"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/challenges"
          icon={Star}
          label="Desafíos"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default GamificationNavigation;
