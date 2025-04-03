
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRoleType, toUserRoleType } from '@/types/auth';
import { getRoleName, getHomePath } from '@/utils/roleUtils';

export const useSidebarNavigation = (
  userRole: UserRoleType,
  viewAsRole?: UserRoleType | null,
  onRoleChange?: (role: UserRoleType) => void
) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Track "view as" role for admin role-switching - using null instead of 'current'
  const [currentViewRole, setCurrentViewRole] = useState<UserRoleType | null>(viewAsRole || null);
  
  // Track current language (could come from a context/cookie)
  const [currentLanguage, setCurrentLanguage] = useState('es');
  
  // Update local state if prop changes
  useEffect(() => {
    if (viewAsRole) {
      setCurrentViewRole(viewAsRole);
    }
  }, [viewAsRole]);
  
  // Calculate effective role (actual or viewed-as)
  const effectiveRole = currentViewRole || userRole;
  
  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };
  
  // Handle role change
  const handleRoleChange = (role: UserRoleType) => {
    setCurrentViewRole(role);
    
    if (onRoleChange) {
      onRoleChange(role);
    }
  };
  
  // Handle language change
  const changeLanguage = (code: string) => {
    setCurrentLanguage(code);
    // Additional logic for language change (e.g., update context, store in cookies)
  };
  
  return {
    isCollapsed,
    toggleSidebar,
    currentViewRole,
    currentLanguage,
    effectiveRole,
    handleRoleChange,
    getRoleName,
    getHomePath,
    changeLanguage
  };
};
