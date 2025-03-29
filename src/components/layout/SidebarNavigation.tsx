
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import GroupedNavigation from './sidebar/GroupedNavigation';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  
  // Determine the effective role for navigation
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  return (
    <div className="flex flex-col gap-1">
      <GroupedNavigation viewAsRole={effectiveRole} />
    </div>
  );
};

export default SidebarNavigation;
