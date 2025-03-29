
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import GroupedNavigation from './sidebar/GroupedNavigation';

interface SidebarNavigationProps {
  viewAsRole?: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole }) => {
  const { userRole } = useAuth();
  
  // Determinar el rol efectivo para la navegación
  const effectiveRole = viewAsRole && viewAsRole !== 'current' ? viewAsRole : userRole;

  return (
    <GroupedNavigation viewAsRole={effectiveRole} />
  );
};
