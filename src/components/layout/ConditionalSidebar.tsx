
import React, { useEffect, useState } from 'react';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { SidebarMainNavigation } from './sidebar/navigation/SidebarMainNavigation';
import SidebarLogoSection from './sidebar/SidebarLogoSection';
import SidebarFooter from './sidebar/SidebarFooter';
import { cn } from '@/lib/utils';
import { useDynamicNavigation } from '@/hooks/useDynamicNavigation';
import { NavigationItemWithChildren } from '@/types/navigation-manager';

interface ConditionalSidebarProps {
  userRole: UserRoleType;
  effectiveRole: UserRoleType;
  messagesCount: number;
  notificationsCount: number;
  currentViewRole: UserRoleType | null;
  getRoleName: (role: UserRoleType) => string;
  getHomePath: (role: UserRoleType) => string;
}

/**
 * ConditionalSidebar determina qué navegación mostrar basado en el rol efectivo del usuario.
 * Es un componente unificado que maneja toda la navegación lateral.
 */
const ConditionalSidebar: React.FC<ConditionalSidebarProps> = ({
  userRole,
  effectiveRole,
  messagesCount,
  notificationsCount,
}) => {
  // State for navigation items
  const [navigationItems, setNavigationItems] = useState<NavigationItemWithChildren[]>([]);
  const { getNavigationItemsByRole, isLoading } = useDynamicNavigation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Fetch navigation items when effective role changes
  useEffect(() => {
    const fetchNavigation = async () => {
      if (effectiveRole) {
        try {
          const items = await getNavigationItemsByRole(effectiveRole);
          // Convert flat items to tree structure if needed
          setNavigationItems(items as NavigationItemWithChildren[]);
        } catch (error) {
          console.error('Error fetching navigation:', error);
        }
      }
    };

    fetchNavigation();
  }, [effectiveRole, getNavigationItemsByRole]);

  console.log('ConditionalSidebar with effectiveRole:', effectiveRole, 'isCollapsed:', isCollapsed);

  return (
    <div className={cn(
      "h-full flex flex-col pb-0 bg-background border-r border-border/50 transition-all",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Espacio superior con logo y botón de toggle */}
      <div className="p-3 border-b border-border/30 mb-1">
        <SidebarLogoSection isCollapsed={isCollapsed} />
      </div>

      {/* Main navigation based on role */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent px-2">
        <SidebarMainNavigation 
          effectiveRole={effectiveRole}
          messagesCount={messagesCount}
          notificationsCount={notificationsCount}
          navigationMenus={navigationItems}
        />
      </div>
      
      {/* Footer Section */}
      <SidebarFooter />
    </div>
  );
};

export default ConditionalSidebar;
