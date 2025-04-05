
import React from 'react';
import { Sidebar as SidebarComponent, SidebarContent as ShadcnSidebarContent } from '@/components/ui/sidebar';
import SidebarFooter from './sidebar/SidebarFooter';
import { cn } from '@/lib/utils';
import CustomSidebarContent from './sidebar/SidebarContent';

const Sidebar: React.FC = () => {
  return (
    <SidebarComponent>
      <CustomSidebarContent />
      <SidebarFooter />
    </SidebarComponent>
  );
};

export default Sidebar;
