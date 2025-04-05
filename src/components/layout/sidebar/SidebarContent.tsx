
import React from 'react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider'; 
import { SidebarMainNavigation } from './navigation/SidebarMainNavigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth';

const SidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const { userRole } = useAuth();

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
          isCollapsed={!isExpanded} 
          effectiveRole={userRole as any}
        />
      </div>
      
      {userRole && (
        <div className={cn(
          "px-3 pt-2 text-xs font-medium text-muted-foreground",
          !isExpanded && "text-center w-full"
        )}>
          <div className={cn(
            "px-2 py-1 text-center rounded-md border border-primary/20 bg-primary/5",
            !isExpanded && "mx-auto w-16"
          )}>
            {isExpanded ? 'Rol: ' : ''}{userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
