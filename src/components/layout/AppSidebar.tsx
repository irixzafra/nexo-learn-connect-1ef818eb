
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
import SidebarNavigation from './SidebarNavigation';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  const { open, setOpen } = useSidebar();
  
  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(open));
  }, [open]);
  
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="flex items-center justify-between border-b px-4 py-3">
        <NexoLogo className="h-8 w-auto" />
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-2 overflow-y-auto">
        <SidebarNavigation viewAsRole={viewAsRole} />
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
