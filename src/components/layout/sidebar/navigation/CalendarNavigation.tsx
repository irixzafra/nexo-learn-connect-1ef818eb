
import React from 'react';
import { Calendar } from 'lucide-react';
import { 
  SidebarMenu
} from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

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
          to="/app/calendar"
          icon={Calendar}
          label="Calendario"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default CalendarNavigation;
