
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider'; 
import { SidebarMainNavigation } from './navigation/SidebarMainNavigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';

interface SidebarContentProps {
  userRole?: UserRoleType;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ userRole }) => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const { userRole: contextUserRole } = useAuth();
  
  const effectiveRole = userRole || contextUserRole as UserRoleType;

  return (
    <div className={cn(
      "flex flex-col h-full py-4 overflow-y-auto",
      !isExpanded && "items-center" // Center items when collapsed
    )}>
      <div className="px-3 py-2">
        {/* Logo or branding goes here */}
      </div>
      
      <div className={cn("flex-1", isExpanded ? "px-3" : "px-1")}>
        <SidebarMainNavigation 
          effectiveRole={effectiveRole}
        />
      </div>
    </div>
  );
};

export default SidebarContent;
