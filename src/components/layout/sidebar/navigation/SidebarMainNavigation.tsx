
import React from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavGroup from './SidebarNavGroup';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { NavigationMenus } from '@/types/navigation';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';
import { 
  getNavigationByRole 
} from '@/config/navigation';

interface SidebarMainNavigationProps {
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  effectiveRole = 'student',
  messagesCount = 0,
  notificationsCount = 0
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Get navigation structure based on role from SSOT
  const roleNavigation = getNavigationByRole(effectiveRole);
  
  console.log('SidebarMainNavigation rendering with role:', effectiveRole);
  
  return (
    <div className="space-y-1 py-2">
      {/* Render navigation groups based on SSOT structure */}
      {Object.entries(roleNavigation).map(([groupName, items], index) => (
        <SidebarNavGroup
          key={`${effectiveRole}-${groupName}`}
          title={groupName.charAt(0).toUpperCase() + groupName.slice(1)} // Capitalize group name
          icon={items[0]?.icon}
          isCollapsed={isCollapsed}
          defaultOpen={index === 0}
          id={`${effectiveRole}-${groupName}`}
          items={items.map(item => ({
            label: item.label,
            path: item.path || '#',
            icon: item.icon,
            badge: item.label.toLowerCase().includes('mensaje') ? messagesCount : 
                   item.label.toLowerCase().includes('notificac') ? notificationsCount : 
                   item.badge,
            disabled: item.disabled,
            isHighlighted: item.isHighlighted
          }))}
        />
      ))}
    </div>
  );
};

export default SidebarMainNavigation;
