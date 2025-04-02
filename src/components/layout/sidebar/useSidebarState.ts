
import { useState, useCallback } from 'react';

interface SidebarState {
  expanded: {
    [key: string]: boolean;
  };
}

export const useSidebarState = () => {
  const [state, setState] = useState<SidebarState>({
    expanded: {
      general: true,
      learning: true,
      community: true,
      instructor: false,
      administration: false,
      configuration: false,
      account: false
    }
  });

  const toggleGroup = useCallback((group: string) => {
    setState(prevState => ({
      ...prevState,
      expanded: {
        ...prevState.expanded,
        [group]: !prevState.expanded[group]
      }
    }));
  }, []);

  const toggleExpanded = useCallback((sectionId: keyof typeof state.expanded) => {
    setState(prevState => ({
      ...prevState,
      expanded: {
        ...prevState.expanded,
        [sectionId]: !prevState.expanded[sectionId]
      }
    }));
  }, []);

  return {
    expanded: state.expanded,
    toggleGroup,
    toggleExpanded
  };
};

export default useSidebarState;
