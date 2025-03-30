
import React from 'react';
import { UserRole } from '@/types/auth';
import RefactoredSidebarNavigation from './sidebar/RefactoredSidebarNavigation';

interface SidebarNavigationProps {
  viewAsRole?: 'current' | UserRole;
}

// This component is now just a wrapper around the refactored version
// to maintain backward compatibility
const SidebarNavigation: React.FC<SidebarNavigationProps> = (props) => {
  return <RefactoredSidebarNavigation {...props} />;
};

export default SidebarNavigation;
