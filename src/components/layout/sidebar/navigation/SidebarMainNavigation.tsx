
import React, { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavGroup from './SidebarNavGroup';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useAuth } from '@/contexts/auth';
import { getNavigationByRole } from '@/config/navigation';
import { NavigationMenus } from '@/types/navigation';
import { 
  Home,
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings,
  Bell,
  MessageSquare 
} from 'lucide-react';

interface SidebarMainNavigationProps {
  isCollapsed?: boolean;
  effectiveRole?: UserRoleType;
  messagesCount?: number;
  notificationsCount?: number;
}

export const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({ 
  isCollapsed = false,
  effectiveRole,
  messagesCount = 0,
  notificationsCount = 0
}) => {
  const { state } = useSidebar();
  const { userRole } = useAuth();
  const sidebarCollapsed = isCollapsed || state === "collapsed";
  const role = effectiveRole || userRole as UserRoleType || 'student';
  
  // Track expanded sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    dashboard: true,
    learning: true,
    community: true
  });

  // Create a default navigation structure for rendering
  const defaultNavigation: NavigationMenus = {
    dashboard: [
      {
        label: 'Panel Principal',
        path: '/app/dashboard',
        icon: LayoutDashboard,
      }
    ],
    learning: [
      {
        label: 'Cursos',
        path: '/app/courses',
        icon: BookOpen,
      }
    ],
    community: [
      {
        label: 'Comunidad',
        path: '/app/community',
        icon: Users,
      },
      {
        label: 'Mensajes',
        path: '/app/messages',
        icon: MessageSquare,
        badge: messagesCount
      },
      {
        label: 'Notificaciones',
        path: '/app/notifications',
        icon: Bell,
        badge: notificationsCount
      }
    ],
    settings: [
      {
        label: 'Configuración',
        path: '/app/settings',
        icon: Settings,
      }
    ]
  };
  
  // Get role-based navigation if available, otherwise use default
  const [navigation, setNavigation] = useState<NavigationMenus>(defaultNavigation);
  
  useEffect(() => {
    try {
      // Try to get role-based navigation
      const roleNavigation = getNavigationByRole(role);
      if (roleNavigation && Object.keys(roleNavigation).length > 0) {
        setNavigation(roleNavigation);
      }
    } catch (error) {
      console.warn('Error loading role navigation:', error);
      // Fallback to default navigation
    }
  }, [role]);

  return (
    <div className="space-y-1 py-2">
      {/* Render all navigation groups */}
      {Object.entries(navigation).map(([key, items]) => {
        if (!items || items.length === 0) return null;
        
        // Get section title from key
        const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
        const sectionIcon = items[0]?.icon ? items[0].icon : Home;
        
        return (
          <SidebarNavGroup
            key={key}
            title={sectionTitle}
            icon={sectionIcon}
            isCollapsed={sidebarCollapsed}
            effectiveRole={role}
            items={items}
            defaultOpen={openSections[key] || false}
            id={key}
          />
        );
      })}
    </div>
  );
};

export default SidebarMainNavigation;
