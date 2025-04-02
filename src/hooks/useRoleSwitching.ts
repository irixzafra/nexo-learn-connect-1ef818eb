
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRoleType } from '@/types/auth';
import { useLocalStorage } from './useLocalStorage';

export const useRoleSwitching = () => {
  const { userRole } = useAuth();
  const [viewAsRole, setViewAsRole] = useLocalStorage<'current' | UserRoleType>('viewAsRole', 'current');
  const [effectiveRole, setEffectiveRole] = useState<UserRoleType>(userRole as UserRoleType);
  
  useEffect(() => {
    // Determinar el rol efectivo basado en viewAsRole
    if (viewAsRole === 'current' || userRole !== 'admin') {
      setEffectiveRole(userRole as UserRoleType);
    } else {
      setEffectiveRole(viewAsRole);
    }
  }, [viewAsRole, userRole]);
  
  const handleRoleChange = (role: UserRoleType) => {
    if (userRole === 'admin') {
      setViewAsRole(role);
    }
  };
  
  const resetToOriginalRole = () => {
    setViewAsRole('current');
  };
  
  const isViewingAsOtherRole = viewAsRole !== 'current' && userRole === 'admin';
  
  return {
    currentRole: userRole as UserRoleType,
    effectiveRole,
    viewAsRole,
    handleRoleChange,
    resetToOriginalRole,
    isViewingAsOtherRole,
    canSwitchRoles: userRole === 'admin'
  };
};
