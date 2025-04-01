
import React, { createContext, useContext, ReactNode } from 'react';

// Create a simplified context without editing features
export interface EditModeContextProps {
  isEditMode: boolean;
  canEdit: boolean;
}

// Create context with default values
const EditModeContext = createContext<EditModeContextProps>({
  isEditMode: false,
  canEdit: false,
});

interface EditModeProviderProps {
  children: ReactNode;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  // Simplified context - editing functionality completely removed
  const value = {
    isEditMode: false,
    canEdit: false,
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
};

// Hook for using edit mode context
export const useEditMode = () => useContext(EditModeContext);
