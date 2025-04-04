
import React from 'react';
import { useUserPermissions } from '@/hooks/useUserPermissions';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: string;
  permissions?: string[];
  fallback?: React.ReactNode;
}

/**
 * PermissionGuard - Only renders children if user has the required permission(s)
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  permissions = [],
  fallback = null
}) => {
  const { hasPermission, hasAnyPermission } = useUserPermissions();
  
  // Check if user has required permissions
  const hasAccess = React.useMemo(() => {
    if (permission) {
      return hasPermission(permission);
    }
    
    if (permissions.length > 0) {
      return hasAnyPermission(permissions);
    }
    
    // No permission requirements, allow access
    return true;
  }, [permission, permissions, hasPermission, hasAnyPermission]);
  
  if (!hasAccess) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default PermissionGuard;
