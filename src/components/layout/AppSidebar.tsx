
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NexoLogo } from '@/components/ui/nexo-logo';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRole } from '@/types/auth';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="flex items-center justify-between border-b px-4 py-3">
        <NexoLogo className="h-8 w-auto" />
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-2">
        {/* Removed SidebarNavigation here as it's already rendered in AppLayout */}
      </SidebarContent>
      
      <SidebarFooter className="border-t p-3">
        <SidebarFooterContent 
          viewAsRole={viewAsRole} 
          onRoleChange={onRoleChange} 
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
