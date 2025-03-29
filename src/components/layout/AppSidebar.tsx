
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader 
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
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center">
          <NexoLogo className="h-9 w-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <SidebarNavigation />
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <SidebarFooterContent 
          viewAsRole={viewAsRole} 
          onRoleChange={onRoleChange} 
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
