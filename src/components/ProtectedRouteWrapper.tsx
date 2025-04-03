
import React, { ReactNode } from 'react';
import ProtectedRoute from './ProtectedRoute';
import { UserRoleType } from '@/types/auth';

interface ProtectedRouteWrapperProps {
  children: ReactNode;
  requiredRole?: UserRoleType;
  roles?: UserRoleType[];
  requiredRoles?: UserRoleType[];
  checkFn?: () => boolean;
  fallbackPath?: string;
}

// This is a wrapper around ProtectedRoute that properly handles children
const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({
  children,
  ...props
}) => {
  return <ProtectedRoute {...props}>{children}</ProtectedRoute>;
};

export default ProtectedRouteWrapper;
