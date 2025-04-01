
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
  // Default state with all groups closed
  const defaultState: SidebarGroups = {
    general: false,
    learning: false,
    community: false,
    administration: false,
    instructor: false,
    account: false,
    sistemas: false
  };
  
  // Retrieve previous state from localStorage or use defaults
  const getSavedState = (): SidebarGroups => {
    const savedState = localStorage.getItem('sidebarGroups');
    return savedState ? JSON.parse(savedState) : defaultState;
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
