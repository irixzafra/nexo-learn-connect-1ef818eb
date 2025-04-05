
import React from 'react';
import { Sidebar as SidebarComponent, SidebarContent } from '@/components/ui/sidebar';
import SidebarFooter from './sidebar/SidebarFooter';
import { cn } from '@/lib/utils';
import SidebarContent from './sidebar/SidebarContent';

const Sidebar: React.FC = () => {
  return (
    <SidebarComponent>
      <SidebarContent />
      <SidebarFooter />
    </SidebarComponent>
  );
};

export default Sidebar;
