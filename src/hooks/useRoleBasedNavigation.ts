
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { 
  learningNavigation, 
  communityNavigation, 
  gamificationNavigation, 
  dashboardNavigation, 
  studentNavigation 
} from '@/config/navigation/index';
import { filterNavigationByRole, getHomePathByRole } from '@/utils/navigationUtils';

export const useRoleBasedNavigation = (role: UserRoleType) => {
  const [filteredNavigation, setFilteredNavigation] = useState({
    dashboardNavigation: dashboardNavigation,
    learningNavigation: learningNavigation,
    communityNavigation: communityNavigation,
    gamificationNavigation: gamificationNavigation,
    studentNavigation: studentNavigation
  });

  useEffect(() => {
    // Filter navigation items based on user role
    setFilteredNavigation({
      dashboardNavigation: filterNavigationByRole(dashboardNavigation, role),
      learningNavigation: filterNavigationByRole(learningNavigation, role),
      communityNavigation: filterNavigationByRole(communityNavigation, role),
      gamificationNavigation: filterNavigationByRole(gamificationNavigation, role),
      studentNavigation: filterNavigationByRole(studentNavigation, role)
    });
  }, [role]);

  // Add missing getRoleHomePath function
  const getRoleHomePath = () => {
    return getHomePathByRole(role);
  };

  return {
    ...filteredNavigation,
    getRoleHomePath
  };
};
