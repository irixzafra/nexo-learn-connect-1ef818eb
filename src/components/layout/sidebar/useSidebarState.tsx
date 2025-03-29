
import { useState, useEffect } from 'react';

export type SidebarGroups = {
  general: boolean;
  learning: boolean;
  community: boolean;
  administration: boolean;
  instructor: boolean;
  account: boolean;
  sistemas: boolean; // Changed from infrastructure to sistemas for clarity
};

export const useSidebarState = () => {
  // Retrieve previous state from localStorage or use defaults
  const getSavedState = (): SidebarGroups => {
    const savedState = localStorage.getItem('sidebarGroups');
    return savedState ? JSON.parse(savedState) : {
      general: true,
      learning: true,
      community: false,
      administration: true,
      instructor: true,
      account: true,
      sistemas: true // Changed from infrastructure to sistemas
    };
  };
  
  const [expanded, setExpanded] = useState<SidebarGroups>(getSavedState());
  
  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarGroups', JSON.stringify(expanded));
  }, [expanded]);

  const toggleGroup = (group: keyof SidebarGroups) => {
    setExpanded(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return { expanded, toggleGroup };
};
