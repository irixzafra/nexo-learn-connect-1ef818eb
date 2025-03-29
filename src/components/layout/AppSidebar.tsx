
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { NexoLogo } from '@/components/ui/nexo-logo';
import { SidebarNavigation } from './SidebarNavigation';
import SidebarFooterContent from './SidebarFooterContent';
import { UserRole } from '@/types/auth';
import { useAuth } from '@/contexts/AuthContext';
import { Menu } from 'lucide-react';

type ViewAsRole = UserRole | 'current';

interface AppSidebarProps {
  viewAsRole: ViewAsRole;
  onRoleChange: (role: UserRole) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ viewAsRole, onRoleChange }) => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Mobile menu trigger - Only visible on small screens */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <SidebarTrigger>
          <Menu className="h-6 w-6" />
        </SidebarTrigger>
      </div>
      
      <Sidebar className="border-r bg-sidebar">
        <SidebarHeader className="border-b px-6 py-4">
          <div className="flex items-center">
            <NexoLogo className="h-9 w-auto" />
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-3 py-4">
          <SidebarNavigation viewAsRole={viewAsRole} />
        </SidebarContent>
        
        <SidebarFooter className="border-t p-4">
          <SidebarFooterContent 
            viewAsRole={viewAsRole} 
            onRoleChange={onRoleChange} 
          />
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
