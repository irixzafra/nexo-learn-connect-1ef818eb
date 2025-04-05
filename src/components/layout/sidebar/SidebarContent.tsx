
import React, { useState, useEffect } from 'react';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider'; 
import { SidebarMainNavigation } from './navigation/SidebarMainNavigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth';
import { useNotifications } from '@/hooks/useNotifications';
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { useDynamicNavigation } from '@/hooks/useDynamicNavigation';

const SidebarContent: React.FC = () => {
  const { state } = useSidebar();
  const isExpanded = state === "expanded";
  const { userRole } = useAuth();
  const { unreadCount: notificationsCount } = useNotifications();
  const messagesCount = 3; // Valor de demostración
  const [navigationItems, setNavigationItems] = useState<NavigationItemWithChildren[]>([]);
  const { getNavigationItemsByRole } = useDynamicNavigation();
  
  useEffect(() => {
    if (userRole) {
      getNavigationItemsByRole(userRole)
        .then(items => setNavigationItems(items))
        .catch(err => console.error('Error loading navigation:', err));
    }
  }, [userRole, getNavigationItemsByRole]);

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
          effectiveRole={userRole || 'anonymous'}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          navigationMenus={navigationItems}
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
