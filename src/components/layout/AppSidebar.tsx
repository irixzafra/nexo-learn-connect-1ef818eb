
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter
} from '@/components/ui/sidebar';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRoleType } from '@/types/auth';

type ViewAsRole = UserRoleType | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRoleType) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent className="px-2 py-2">
        {/* The sidebar navigation is rendered in AppLayout */}
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
