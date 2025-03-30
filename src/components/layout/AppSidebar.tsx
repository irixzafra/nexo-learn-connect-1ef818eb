import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NexoLogo } from '@/components/ui/logo';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRole } from '@/types/auth';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  return (
    <Sidebar className="border-r bg-sidebar hidden">
      <SidebarHeader className="flex items-center justify-center py-4">
        <NexoLogo variant="icon" className="h-8 w-auto" />
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-2">
        {/* The sidebar navigation content goes here */}
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
