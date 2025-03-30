
// This file has been deprecated and is no longer used in the application.
// Navigation is now handled by SidebarNavigation.tsx

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

interface GroupedNavigationProps {
  viewAsRole?: string;
}

const GroupedNavigation: React.FC<GroupedNavigationProps> = ({ viewAsRole }) => {
  // This component is no longer used
  return null;
};

export default GroupedNavigation;
