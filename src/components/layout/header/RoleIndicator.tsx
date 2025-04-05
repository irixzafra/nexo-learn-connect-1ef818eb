
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { UserRoleDisplay } from '@/features/users/UserRoleType';

interface RoleIndicatorProps {
  className?: string;
}

const RoleIndicator: React.FC<RoleIndicatorProps> = ({ className }) => {
  const { userRole } = useAuth();

  if (!userRole) return null;

  return (
    <div className={className}>
      <UserRoleDisplay role={userRole as any} size="sm" />
    </div>
  );
};

export default RoleIndicator;
