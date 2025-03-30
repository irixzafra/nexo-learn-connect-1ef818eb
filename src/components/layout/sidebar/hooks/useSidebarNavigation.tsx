
import { useState, useEffect } from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';

interface SidebarNavigationHookResult {
  isCollapsed: boolean;
  currentViewRole: 'current' | UserRoleType;
  currentLanguage: string;
  effectiveRole: UserRoleType;
  handleRoleChange: (role: UserRoleType) => void;
  getRoleName: (role: UserRoleType) => string;
  getHomePath: (role: UserRoleType) => string;
  changeLanguage: (code: string) => void;
}

export const useSidebarNavigation = (
  userRole: UserRoleType,
  viewAsRole?: 'current' | UserRoleType,
  onRoleChange?: (role: UserRoleType) => void
): SidebarNavigationHookResult => {
  // Local state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRoleType>(viewAsRole || 'current');
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  // Calculate the effective role (the role used for rendering the UI)
  const effectiveRole = currentViewRole === 'current' ? userRole : currentViewRole;
  
  // Handler for role changes
  const handleRoleChange = (role: UserRoleType) => {
    setCurrentViewRole(role);
    
    if (onRoleChange) {
      onRoleChange(role);
    }
  };
  
  // Get role display name
  const getRoleName = (role: UserRoleType): string => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Estudiante';
      case 'sistemas':
        return 'Sistemas';
      case 'anonimo':
        return 'Anónimo';
      default:
        return role;
    }
  };
  
  // Get home path based on role
  const getHomePath = (role: UserRoleType): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'sistemas':
        return '/admin/systems';
      default:
        return '/home';
    }
  };
  
  // Change language handler
  const changeLanguage = (code: string) => {
    setCurrentLanguage(code);
    // Additional language change logic here
  };
  
  return {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  };
};
