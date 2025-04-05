
import { useState, useCallback } from 'react';
import { UserRoleType } from '@/types/auth';
import { NavigationItemWithChildren } from '@/types/navigation-manager';

// Mock data - this would typically come from an API
const navigationByRole: Record<UserRoleType, NavigationItemWithChildren[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Users', path: '/admin/users', icon: 'Users' },
    { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
  ],
  instructor: [
    { label: 'Dashboard', path: '/instructor/dashboard', icon: 'LayoutDashboard' },
    { label: 'My Courses', path: '/instructor/courses', icon: 'BookOpen' },
    { label: 'Students', path: '/instructor/students', icon: 'Users' },
  ],
  student: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'My Courses', path: '/my-courses', icon: 'BookOpen' },
    { label: 'Explore', path: '/explore', icon: 'Compass' },
  ],
  moderator: [
    { label: 'Dashboard', path: '/moderator/dashboard', icon: 'LayoutDashboard' },
    { label: 'Reports', path: '/moderator/reports', icon: 'Flag' },
    { label: 'Content Review', path: '/moderator/review', icon: 'CheckSquare' },
  ],
  manager: [
    { label: 'Dashboard', path: '/manager/dashboard', icon: 'LayoutDashboard' },
    { label: 'Teams', path: '/manager/teams', icon: 'Users' },
    { label: 'Reports', path: '/manager/reports', icon: 'BarChart' },
  ],
  anonymous: [
    { label: 'Login', path: '/auth/login', icon: 'LogIn' },
    { label: 'Register', path: '/auth/register', icon: 'UserPlus' },
    { label: 'Explore', path: '/explore', icon: 'Compass' },
  ],
};

export const useDynamicNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getNavigationItemsByRole = useCallback(async (role: UserRoleType): Promise<NavigationItemWithChildren[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Return navigation for the specified role, or empty array if not found
      return navigationByRole[role] || [];
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch navigation items');
      setError(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getNavigationItemsByRole,
    isLoading,
    error
  };
};
