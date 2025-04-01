
import React from 'react';
import { UserRoleType } from '@/types/auth';
import SidebarNavSection from './SidebarNavSection';
import SidebarNavItem from './SidebarNavItem';
import { getNavigationByRole } from '@/config/menuConfig';

interface SidebarMainNavigationProps {
  effectiveRole: UserRoleType;
  isCollapsed: boolean;
  messagesCount: number;
  notificationsCount: number;
  getHomePath: () => string;
}

const SidebarMainNavigation: React.FC<SidebarMainNavigationProps> = ({
  effectiveRole,
  isCollapsed,
  messagesCount,
  notificationsCount,
  getHomePath
}) => {
  // Obtener menús filtrados por rol
  const menus = getNavigationByRole(effectiveRole);

  // Actualizar el badge para mensajes si es necesario
  const mainMenuWithBadges = menus.main.map(item => {
    if (item.path === '/messages') {
      return { ...item, badge: messagesCount > 0 ? messagesCount : undefined };
    }
    if (item.path === '/notifications') {
      return { ...item, badge: notificationsCount > 0 ? notificationsCount : undefined };
    }
    return item;
  });

  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        <SidebarNavSection title="Navegación" isCollapsed={isCollapsed}>
          {mainMenuWithBadges.map(item => (
            <SidebarNavItem 
              key={item.path}
              to={item.path}
              icon={item.icon} 
              label={item.label} 
              badge={typeof item.badge === 'number' ? item.badge : undefined}
              isCollapsed={isCollapsed} 
            />
          ))}
        </SidebarNavSection>
        
        {/* Menú de administración si corresponde */}
        {menus.admin.length > 0 && (
          <SidebarNavSection title="Administración" isCollapsed={isCollapsed}>
            {menus.admin.map(item => (
              <SidebarNavItem 
                key={item.path}
                to={item.path}
                icon={item.icon} 
                label={item.label} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </SidebarNavSection>
        )}
        
        {/* Menú de gamificación si corresponde */}
        {menus.gamification.length > 0 && (
          <SidebarNavSection title="Gamificación" isCollapsed={isCollapsed}>
            {menus.gamification.map(item => (
              <SidebarNavItem 
                key={item.path}
                to={item.path}
                icon={item.icon} 
                label={item.label} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </SidebarNavSection>
        )}
      </div>
    </div>
  );
};

export default SidebarMainNavigation;
