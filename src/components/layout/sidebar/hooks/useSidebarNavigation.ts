
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/sidebar-provider';

export interface SidebarNavigationData {
  currentViewRole: UserRoleType | null;
  isCollapsed: boolean;
}

/**
 * Hook para manejar la navegación del sidebar y valores relacionados
 * 
 * @param userRole Rol actual del usuario
 * @param viewAsRole Rol como el que se está viendo (simulación)
 * @param onRoleChange Callback opcional cuando cambia el rol de visualización
 * @returns Objeto con los datos del estado de navegación
 */
export const useSidebarNavigation = (
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
): SidebarNavigationData => {
  // Use viewAsRole if provided, otherwise use userRole
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType | null>(
    viewAsRole || null
  );
  
  // Get sidebar state
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Update if viewAsRole changes
  useEffect(() => {
    if (viewAsRole !== undefined) {
      setCurrentViewRole(viewAsRole);
    }
  }, [viewAsRole]);

  return {
    currentViewRole,
    isCollapsed,
  };
};
