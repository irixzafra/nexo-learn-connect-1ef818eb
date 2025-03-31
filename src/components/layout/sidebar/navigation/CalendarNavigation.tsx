
import React from 'react';
import { Calendar, Clock, PlusCircle } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import { MenuItem } from './common/MenuItem';

interface CalendarNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Calendario"
      icon={Calendar}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/calendar"
          icon={Calendar}
          label="Mi Calendario"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/calendar/schedule"
          icon={Clock}
          label="Programación"
          isCollapsed={isCollapsed}
        />
        
        <MenuItem
          to="/calendar/create"
          icon={PlusCircle}
          label="Crear Evento"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default CalendarNavigation;
