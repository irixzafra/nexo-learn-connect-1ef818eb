
import React, { useEffect, useState } from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavGroup from './SidebarNavGroup';
import { getNavigationByRole } from '@/config/navigation';
import { NavigationMenus } from '@/types/navigation';
import { Home } from 'lucide-react';

interface SidebarMainNavigationProps {
  isCollapsed?: boolean;
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  isCollapsed = false,
  effectiveRole = 'student',
  messagesCount = 0,
  notificationsCount = 0
}) => {
  // State to store the navigation structure
  const [navigation, setNavigation] = useState<NavigationMenus>({});
  
  // Update badge counts in navigation items
  const applyDynamicBadges = (navItems: NavigationMenus): NavigationMenus => {
    const updatedNavigation = {...navItems};
    
    // Find and update message notifications if they exist
    Object.keys(updatedNavigation).forEach(key => {
      const items = updatedNavigation[key];
      if (items) {
        updatedNavigation[key] = items.map(item => {
          if (item.label === 'Mensajes' || item.label === 'Messages') {
            return {...item, badge: messagesCount};
          }
          if (item.label === 'Notificaciones' || item.label === 'Notifications') {
            return {...item, badge: notificationsCount};
          }
          return item;
        });
      }
    });
    
    return updatedNavigation;
  };
  
  // Load navigation based on current role
  useEffect(() => {
    try {
      const roleNavigation = getNavigationByRole(effectiveRole);
      if (roleNavigation) {
        const navWithBadges = applyDynamicBadges(roleNavigation);
        setNavigation(navWithBadges);
      }
    } catch (error) {
      console.error('Error loading navigation for role:', effectiveRole, error);
      // Set an empty navigation in case of error
      setNavigation({});
    }
  }, [effectiveRole, messagesCount, notificationsCount]);

  return (
    <div className="space-y-1 py-2">
      {/* Render all navigation groups */}
      {Object.entries(navigation).map(([key, items]) => {
        if (!items || items.length === 0) return null;
        
        // Get section title from key with proper capitalization
        const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
        
        // Use the first item's icon as the section icon, or a default
        const sectionIcon = items[0]?.icon ? items[0].icon : Home;
        
        return (
          <SidebarNavGroup
            key={key}
            title={sectionTitle}
            icon={sectionIcon}
            isCollapsed={isCollapsed}
            effectiveRole={effectiveRole}
            items={items}
            defaultOpen={true}
            id={key}
          />
        );
      })}
    </div>
  );
};

export default SidebarMainNavigation;
