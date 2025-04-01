
import React from 'react';
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
  
  // Verificamos si estamos en una página de administración
  const isAdminPage = location.pathname.startsWith('/admin');

  // Obtener menús filtrados por rol
  const menus = getNavigationByRole(effectiveRole);

  // Filtrar grupos por rol
  const filteredGroups = navigationGroups.filter(group => {
    // Si estamos en una página de admin y hideOnAdminPages es true, ocultamos ciertos grupos
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
      
      // Verificar y corregir enlaces
      if (item.path && !item.path.startsWith('http')) {
        // Asegurarnos de que los enlaces funcionen correctamente
        const isActive = location.pathname === item.path;
        item.active = isActive;
      }
      
      return {
        ...item,
        badge
      };
    });
  };

  // Si no hay grupos después del filtrado, no renderizamos nada
  if (filteredGroups.length === 0) {
    return null;
  }

  return (
    <div className={`flex-1 overflow-auto ${isCollapsed ? "px-2" : "px-4"}`}>
      <div className="space-y-4 py-4">
        {filteredGroups.map(group => {
          // Obtener elementos de menú para este grupo
          const groupItems = menus[group.navKey as keyof typeof menus] || [];
          // Aplicar validación de rutas y mejorar con badges
          const validatedItems = useValidateRoutes(groupItems);
          const enhancedItems = enhanceItemsWithBadges(validatedItems);
          
          // No mostrar grupos sin elementos
          if (!enhancedItems || enhancedItems.length === 0) {
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
              items={enhancedItems}
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
