import React, { useState, useMemo } from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavSection from './SidebarNavSection';
import SidebarNavGroup from './SidebarNavGroup';
import { getNavigationByRole } from '@/config/navigation';
import { useSidebarState } from '@/components/layout/sidebar/useSidebarState';
import { useValidateRoutes } from '@/hooks/useValidateRoutes';
import {
  Home,
  BookOpen,
  Compass,
  GraduationCap,
  CreditCard,
  Settings,
  Navigation,
  Shield
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Map navigation groups to sidebar state groups
const navigationGroups = [
  {
    id: 'general',
    title: 'Mis Cursos',
    icon: BookOpen,
    navKey: 'main'
  },
  {
    id: 'learning',
    title: 'Explorar',
    icon: Compass,
    navKey: 'explore',
    requiredRole: ['student', 'instructor', 'admin', 'sistemas', 'moderator', 'content_creator', 'guest', 'beta_tester']
  },
  {
    id: 'instructor',
    title: 'Profesores',
    icon: GraduationCap,
    navKey: 'instructor',
    requiredRole: ['instructor', 'admin', 'sistemas']
  },
  {
    id: 'academic',
    title: 'Gestión Académica',
    icon: BookOpen,
    navKey: 'academic',
    requiredRole: ['admin', 'sistemas']
  },
  {
    id: 'finance',
    title: 'Finanzas',
    icon: CreditCard,
    navKey: 'finance',
    requiredRole: ['admin', 'sistemas']
  },
  {
    id: 'settings',
    title: 'Configuración',
    icon: Settings,
    navKey: 'settings',
    requiredRole: ['admin', 'sistemas']
  },
  {
    id: 'admin',
    title: 'Administración',
    icon: Shield,
    navKey: 'admin',
    requiredRole: ['admin', 'sistemas']
  }
];

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
  hideOnAdminPages?: boolean;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath,
  hideOnAdminPages = false
}) => {
  // Get sidebar state from localStorage
  const { expanded } = useSidebarState();
  const location = useLocation();
  const validateRoutes = useValidateRoutes();
  
  // Check if we're on an admin page
  const isAdminPage = location.pathname.startsWith('/admin');

  // Get menus filtered by role
  const menus = getNavigationByRole(effectiveRole);

  // Filter groups by role
  const filteredGroups = navigationGroups.filter(group => {
    // If we're on an admin page and hideOnAdminPages is true, hide certain groups
    if (isAdminPage && hideOnAdminPages && 
        (group.id === 'general' || group.id === 'learning')) {
      return false;
    }
    
    if (!group.requiredRole) return true;
    
    if (Array.isArray(group.requiredRole)) {
      return group.requiredRole.includes(effectiveRole);
    }
    
    return group.requiredRole === effectiveRole;
  });

  // Function to enhance items with badges - moved outside the render loop
  const enhanceItemsWithBadges = (items: any[]) => {
    return items.map(item => {
      let badge = undefined;
      
      if (item.path === '/messages' || item.path === '/instructor/messages') {
        badge = messagesCount > 0 ? messagesCount : undefined;
      }
      
      if (item.path === '/notifications') {
        badge = notificationsCount > 0 ? notificationsCount : undefined;
      }
      
      // Verify and correct links
      if (item.path && !item.path.startsWith('http')) {
        // Make sure links work correctly
        const isActive = location.pathname === item.path;
        item.active = isActive;
      }
      
      return {
        ...item,
        badge
      };
    });
  };

  // Pre-validate all menu items - do this once outside the mapping of groups
  const validatedMenus = useMemo(() => {
    const result: Record<string, any[]> = {};
    
    for (const key in menus) {
      if (Object.prototype.hasOwnProperty.call(menus, key)) {
        const items = menus[key as keyof typeof menus] || [];
        // Call validate with the items array
        const validatedItems = validateRoutes.validate(items.map((item: any) => item.path || ''));
        
        // Map the validation results back to the original items
        const enhancedItems = items.map((item: any, index: number) => {
          const validationResult = validatedItems[index];
          return {
            ...item,
            isValid: validationResult ? validationResult.isValid : true
          };
        });
        
        result[key] = enhanceItemsWithBadges(enhancedItems);
      }
    }
    
    return result;
  }, [menus, location.pathname, messagesCount, notificationsCount, validateRoutes]);

  // If no groups after filtering, render nothing
  if (filteredGroups.length === 0) {
    return null;
  }

  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        {filteredGroups.map(group => {
          // Get menu items for this group
          const groupItems = validatedMenus[group.navKey as keyof typeof validatedMenus] || [];
          
          // Don't show groups without items
          if (!groupItems || groupItems.length === 0) {
            return null;
          }
          
          // Use the saved state from localStorage for this specific group
          const isGroupExpanded = expanded[group.id as keyof typeof expanded] || false;
          
          return (
            <SidebarNavGroup
              key={group.id}
              id={group.id}
              title={group.title}
              icon={group.icon}
              items={groupItems}
              isCollapsed={isCollapsed}
              effectiveRole={effectiveRole}
              defaultOpen={isGroupExpanded}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
