
import { useState, useEffect } from 'react';
import { UserRoleType, toUserRoleType } from '@/types/auth';

interface UseUserPreferencesProps {
  setRole: (role: UserRoleType | null) => void;
}

export function useUserPreferences({ setRole }: UseUserPreferencesProps) {
  const [theme, setThemeState] = useState<string>(localStorage.getItem('theme') || 'dark');
  const [viewAs, setViewAs] = useState<UserRoleType | 'current'>('current');

  // Load preferences from localStorage
  useEffect(() => {
    // Load theme from localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    
    // Load user role from localStorage
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(toUserRoleType(storedRole));
    }
    
    // Load viewAsRole from localStorage
    const storedViewAsRole = localStorage.getItem('viewAsRole');
    if (storedViewAsRole) {
      setViewAs(storedViewAsRole as UserRoleType | 'current');
    }
  }, [setRole]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const setUserRole = (newRole: UserRoleType) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
  };
  
  const setViewAsRole = (newViewAsRole: UserRoleType | 'current') => {
    setViewAs(newViewAsRole);
    localStorage.setItem('viewAsRole', newViewAsRole);
  };

  // Función explícita para switchViewAsRole
  const switchViewAsRole = (newViewAsRole: UserRoleType | 'current') => {
    setViewAsRole(newViewAsRole);
  };

  const saveUserPreferences = async (preferences: { theme?: string; role?: UserRoleType }) => {
    if (preferences.theme) {
      setTheme(preferences.theme);
    }
    
    if (preferences.role) {
      setUserRole(preferences.role);
    }

    return true;
  };

  return {
    theme,
    viewAs,
    setTheme,
    setUserRole,
    setViewAs,
    setViewAsRole,
    switchViewAsRole, // Aseguramos que esta función se exporte explícitamente
    saveUserPreferences
  };
}
