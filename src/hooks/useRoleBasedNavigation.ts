
import { useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationMenus, MenuItem } from '@/types/navigation';
import { 
  adminNavigation, 
  instructorNavigation, 
  studentNavigation 
} from '@/config/navigation';
import { filterNavigationByRole, getHomePathByRole } from '@/utils/navigationUtils';

export const useRoleBasedNavigation = (role: UserRoleType) => {
  const [filteredNavigation, setFilteredNavigation] = useState<{
    [key: string]: MenuItem[];
  }>({
    dashboardNavigation: [],
    learningNavigation: [],
    communityNavigation: [],
    gamificationNavigation: [],
    studentNavigation: []
  });

  useEffect(() => {
    // Get the navigation structure based on role
    let roleNavigation: NavigationMenus;
    
    switch (role) {
      case 'admin':
        roleNavigation = adminNavigation;
        break;
      case 'instructor':
        roleNavigation = instructorNavigation;
        break;
      case 'student':
      default:
        roleNavigation = studentNavigation;
        break;
    }
    
    // Create filtered navigation menus by applying role filtering to each navigation group
    const filteredMenus: {[key: string]: MenuItem[]} = {};
    
    // Process each menu group in the role navigation
    Object.entries(roleNavigation).forEach(([groupName, items]) => {
      filteredMenus[groupName] = filterNavigationByRole(items, role);
    });
    
    // Update state with the filtered navigation
    setFilteredNavigation(filteredMenus);
  }, [role]);

  // Utility function to get the home path for the current role
  const getRoleHomePath = () => {
    return getHomePathByRole(role);
  };

  return {
    ...filteredNavigation,
    getRoleHomePath
  };
};
