
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleType } from '@/types/auth';

export const useRoleSwitching = () => {
  const { userRole, viewAsRole, setViewAsRole, effectiveRole } = useAuth();
  
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
