
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './header/MobileSidebar';
import { PageTitle } from './header/PageTitle';
import { RoleIndicator } from './header/RoleIndicator';
import { HeaderActions } from './header/HeaderActions';
import { UserMenu } from './header/UserMenu';

interface HeaderContentProps {
  userRole: string | null;
  viewingAs: string | null;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ userRole, viewingAs }) => {
  const viewAsRole = viewingAs || 'current';
  
  return (
    <div className="w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto py-2 px-4 flex justify-between items-center">
        {/* Left side: Logo/Trigger */}
        <div className="flex items-center gap-2">
          {/* SidebarTrigger visible on desktop */}
          <div className="hidden md:block">
            <SidebarTrigger className="h-8 w-8" />
          </div>
          
          {/* Mobile sidebar with sheet */}
          <MobileSidebar viewAsRole={viewAsRole} />
          
          {/* Breadcrumb/Title */}
          <PageTitle />
          
          {/* Role view indicator */}
          <RoleIndicator viewingAs={viewingAs} />
        </div>
        
        {/* Right side: Actions and user menu */}
        <div className="flex items-center gap-2">
          {/* Actions (Edit Mode, Notifications, Help) */}
          <HeaderActions userRole={userRole} />
          
          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
