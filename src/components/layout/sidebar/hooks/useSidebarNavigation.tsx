
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { toast } from 'sonner';

export interface SidebarNavigationState {
  currentViewRole: 'current' | UserRole;
  currentLanguage: string;
  effectiveRole: UserRole;
}

export const useSidebarNavigation = (
  userRole: UserRole | null,
  viewAsRole?: 'current' | UserRole,
  onRoleChange?: (role: UserRole) => void
) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // State for role switching
  const [currentViewRole, setCurrentViewRole] = useState<'current' | UserRole>(viewAsRole || 'current');
  const [currentLanguage, setCurrentLanguage] = useState('es'); // Default language is Spanish
  
  // Effect to update currentViewRole when viewAsRole prop changes
  useEffect(() => {
    if (viewAsRole !== undefined) {
      setCurrentViewRole(viewAsRole);
    }
  }, [viewAsRole]);
  
  // Determine the effective role
  const getEffectiveRole = (): UserRole => {
    if (currentViewRole === 'current') {
      return userRole as UserRole;
    }
    return currentViewRole as UserRole;
  };
  
  const effectiveRole = getEffectiveRole();
  
  // Handle role change
  const handleRoleChange = (role: UserRole) => {
    setCurrentViewRole(role);
    
    // Call the parent's onRoleChange if provided
    if (onRoleChange) {
      onRoleChange(role);
    }
    
    // Store selected role in localStorage for persistence
    localStorage.setItem('viewAsRole', role);
    
    toast.success(`Vista cambiada a: ${getRoleName(role)}`);
  };

  // Get role display name
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'instructor': return 'Instructor';
      case 'student': return 'Estudiante';
      case 'sistemas': return 'Sistemas';
      case 'anonimo': return 'Anónimo';
      default: return 'Usuario';
    }
  };

  // Determine the home path based on the user's role
  const getHomePath = () => {
    switch (effectiveRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'instructor':
        return '/instructor/dashboard';
      case 'student':
      default:
        return '/home';
    }
  };

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    // Here you would typically change the language in your app's state/context
    console.log(`Language changed to ${langCode}`);
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
