
import React from 'react';
import { UserRoleType } from '@/types/auth';
import RefactoredSidebarNavigation from './sidebar/RefactoredSidebarNavigation';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRoleType;
  onRoleChange?: (role: UserRoleType) => void;
}

// This component is now just a wrapper around the refactored version
// to maintain backward compatibility
const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ viewAsRole, onRoleChange }) => {
  return <RefactoredSidebarNavigation viewAsRole={viewAsRole} onRoleChange={onRoleChange} />;
};

export default SidebarNavigation;
