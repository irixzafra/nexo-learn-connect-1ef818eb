

import React, { useEffect } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { SidebarNavigation } from './SidebarNavigation';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  const { user } = useAuth();
  const { open, setOpen } = useSidebar();
  
  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(open));
  }, [open]);
  
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <NexoLogo className="h-9 w-auto" />
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-2 overflow-y-auto">
        <SidebarNavigation viewAsRole={viewAsRole} />
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
