
import React from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavSection from './SidebarNavSection';
import SidebarNavGroup from './SidebarNavGroup';
import { getNavigationByRole } from '@/config/navigation';
import {
  Home,
  BookOpen,
  Compass,
  GraduationCap,
  CreditCard,
  Settings
} from 'lucide-react';

// Definir la estructura de navegación principal con jerarquía
const navigationGroups = [
  {
    id: 'main',
    title: 'Mis Cursos',
    icon: BookOpen,
    navKey: 'main'
  },
  {
    id: 'explore',
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
  // Obtener menús filtrados por rol
  const menus = getNavigationByRole(effectiveRole);

  // Filtrar grupos por rol
  const filteredGroups = navigationGroups.filter(group => {
    if (!group.requiredRole) return true;
    
    if (Array.isArray(group.requiredRole)) {
      return group.requiredRole.includes(effectiveRole);
    }
    
    return group.requiredRole === effectiveRole;
  });

  // Actualizar badges para mensajes y notificaciones
  const enhanceItemsWithBadges = (items: any[]) => {
    return items.map(item => {
      let badge = undefined;
      
      if (item.path === '/messages' || item.path === '/instructor/messages') {
        badge = messagesCount > 0 ? messagesCount : undefined;
      }
      
      if (item.path === '/notifications') {
        badge = notificationsCount > 0 ? notificationsCount : undefined;
      }
      
      return {
        ...item,
        badge
      };
    });
  };

  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        {filteredGroups.map(group => {
          const groupItems = menus[group.navKey as keyof typeof menus];
          const enhancedItems = enhanceItemsWithBadges(groupItems);
          
          return (
            <SidebarNavGroup
              key={group.id}
              title={group.title}
              icon={group.icon}
              items={enhancedItems}
              isCollapsed={isCollapsed}
              effectiveRole={effectiveRole}
              defaultOpen={group.id === 'main'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
