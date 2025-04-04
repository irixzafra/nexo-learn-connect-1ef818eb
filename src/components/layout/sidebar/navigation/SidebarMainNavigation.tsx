
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';
import { getNavigationByRole } from '@/config/navigation';
import SidebarNavGroup from './SidebarNavGroup';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';

interface SidebarMainNavigationProps {
  isCollapsed?: boolean;
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
  getHomePath?: () => string;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  isCollapsed = false,
  effectiveRole = 'student',
  messagesCount = 0,
  notificationsCount = 0,
  getHomePath = () => '/app/home'
}) => {
  const { state } = useSidebar();
  const sidebarCollapsed = isCollapsed || state === "collapsed";
  
  // Track expanded sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dashboard: true,
    learning: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Get navigation items based on role
  const roleNavigation = getNavigationByRole(effectiveRole);

  return (
    <div className="space-y-1">
      {/* Render all navigation groups for the role */}
      {Object.entries(roleNavigation).map(([key, items]) => {
        // Skip empty sections
        if (!items || items.length === 0) return null;
        
        // Skip sections that should be hidden for this role
        const visibleItems = items.filter(item => {
          if (!item.requiredRole) return true;
          
          if (Array.isArray(item.requiredRole)) {
            return item.requiredRole.includes(effectiveRole);
          }
          
          return item.requiredRole === effectiveRole;
        });
        
        if (visibleItems.length === 0) return null;
        
        // Get the first item to determine section name (could be improved with proper section metadata)
        const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
        const sectionIcon = items[0].icon;
        
        return (
          <SidebarNavGroup
            key={key}
            title={sectionTitle}
            icon={sectionIcon}
            isCollapsed={sidebarCollapsed}
            effectiveRole={effectiveRole}
            items={items}
            defaultOpen={openSections[key] || false}
            id={key}
          />
        );
      })}
    </div>
  );
};

// Add default export to work with both named and default imports
export default SidebarMainNavigation;
