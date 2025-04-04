
import React, { useState } from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavGroup from './SidebarNavGroup';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';
import { useAuth } from '@/contexts/auth';
import { MenuItem } from '@/types/navigation';
import { LayoutDashboard, BookOpen, Users, Settings } from 'lucide-react';

// Default navigation structure - will be replaced with actual data
const defaultNavigation: Record<string, MenuItem[]> = {
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
    learning: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Use default navigation for now - this would be replaced with role-based navigation
  const navigation = defaultNavigation;

  return (
    <div className="space-y-1">
      {/* Render all navigation groups */}
      {Object.entries(navigation).map(([key, items]) => {
        // Skip empty sections
        if (!items || items.length === 0) return null;
        
        // Skip sections that should be hidden for this role
        const visibleItems = items.filter(item => {
          if (!item.requiredRole) return true;
          
          if (Array.isArray(item.requiredRole)) {
            return item.requiredRole.includes(role);
          }
          
          return item.requiredRole === role;
        });
        
        if (visibleItems.length === 0) return null;
        
        // Get section title from key
        const sectionTitle = key.charAt(0).toUpperCase() + key.slice(1);
        const sectionIcon = items[0].icon;
        
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
