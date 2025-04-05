
import { NavigationItemWithChildren } from '@/types/navigation-manager';
import { UserRoleType } from '@/types/auth';
import { getNavigationByRole } from '@/config/navigation';

// Function to fetch navigation items from API or local storage
export const fetchNavigationItems = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  // In a real application, this would likely be an API call
  // For this demo, we'll just return the navigation config
  return getNavigationByRole(role) as NavigationItemWithChildren[];
};

// Function to save navigation items
export const saveNavigationItems = async (role: UserRoleType, items: NavigationItemWithChildren[]): Promise<void> => {
  console.log(`Saving navigation items for role: ${role}`, items);
  // In a real application, this would be an API call to update the navigation
  localStorage.setItem(`navigation_${role}`, JSON.stringify(items));
};

// Function to sort navigation items
export const sortNavigationItems = (items: NavigationItemWithChildren[]): NavigationItemWithChildren[] => {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
};

// Function to sync navigation from code definitions
export const syncNavigationFromCode = async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
  const codeNavigation = getNavigationByRole(role) as NavigationItemWithChildren[];
  
  // In a real application, this would merge existing customizations with the code definition
  console.log(`Syncing navigation for role: ${role} with code definition`, codeNavigation);
  
  // Pretend we're saving to the backend
  await saveNavigationItems(role, codeNavigation);
  
  return codeNavigation;
};

// Export everything for usage
export default {
  fetchNavigationItems,
  saveNavigationItems,
  sortNavigationItems,
  syncNavigationFromCode
};
