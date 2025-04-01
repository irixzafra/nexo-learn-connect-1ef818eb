
import React, { createContext, useContext, ReactNode } from 'react';

// Simplified context with no editing functionality
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
  // Always return false for edit mode since the feature has been removed
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
