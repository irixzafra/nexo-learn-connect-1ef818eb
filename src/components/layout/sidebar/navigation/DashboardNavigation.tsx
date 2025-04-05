
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { SidebarMenu } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { SidebarGroup } from '../SidebarGroup';
import MenuItem from './common/MenuItem';

interface DashboardNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({ isOpen, onToggle }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup
      label="Dashboard"
      icon={LayoutDashboard}
      isExpanded={isOpen}
      onToggle={onToggle}
    >
      <SidebarMenu>
        <MenuItem
          to="/app/dashboard"
          icon={LayoutDashboard}
          label="Panel Principal"
          isCollapsed={isCollapsed}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default DashboardNavigation;
