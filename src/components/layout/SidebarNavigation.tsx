
import React from 'react';
import { UserRole } from '@/types/auth';
import RefactoredSidebarNavigation from './sidebar/RefactoredSidebarNavigation';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
  onRoleChange?: (role: UserRole) => void;
}

// This component is now just a wrapper around the refactored version
// to maintain backward compatibility
const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole, onRoleChange }) => {
  return <RefactoredSidebarNavigation viewAsRole={viewAsRole} onRoleChange={onRoleChange} />;
};

export default SidebarNavigation;
