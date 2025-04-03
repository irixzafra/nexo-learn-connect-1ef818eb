
import { useState, useCallback } from 'react';
import { UserRoleType } from '@/types/auth';
import { useAuth } from '@/contexts/auth';
import { useSidebar } from '@/components/ui/sidebar/use-sidebar';
import { getRoleName, getHomePath } from '@/utils/roleUtils';

export function useSidebarNavigation(
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType | null>(viewAsRole || null);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const { setSimulatedRole } = useAuth();

  // Debug the incoming props and state
  console.log('>>> DEBUG useSidebarNavigation: INIT with:', { 
    userRole, 
    viewAsRole, 
    currentViewRole,
    isCollapsed 
  });

  const handleRoleChange = useCallback((role: UserRoleType) => {
    console.log('>>> DEBUG useSidebarNavigation: handleRoleChange called with:', role);
    setCurrentViewRole(role);
    
    // Call the onRoleChange callback if provided
    if (onRoleChange) {
      onRoleChange(role);
    }
    
    // Use the auth context to set the simulated role
    setSimulatedRole(role);
  }, [onRoleChange, setSimulatedRole]);

  const changeLanguage = useCallback((language: string) => {
    console.log('>>> DEBUG useSidebarNavigation: changeLanguage called with:', language);
    setCurrentLanguage(language);
  }, []);

  return {
    isCollapsed,
    currentViewRole,
    currentLanguage,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  };
}
