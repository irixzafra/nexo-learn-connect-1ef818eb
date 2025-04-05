
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './auth';

type InlineEditorContextType = {
  isEditModeEnabled: boolean;
  enableEditMode: () => void;
  disableEditMode: () => void;
  toggleEditMode: () => void;
};

const InlineEditorContext = createContext<InlineEditorContextType | undefined>(undefined);

export const InlineEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userRole } = useAuth();
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  
  // Only admins can use edit mode
  const isAdmin = userRole === 'admin';

  const enableEditMode = () => {
    if (isAdmin) {
      setIsEditModeEnabled(true);
    }
  };

  const disableEditMode = () => {
    setIsEditModeEnabled(false);
  };

  const toggleEditMode = () => {
    if (isAdmin) {
      setIsEditModeEnabled(prev => !prev);
    }
  };

  return (
    <InlineEditorContext.Provider value={{
      isEditModeEnabled,
      enableEditMode,
      disableEditMode,
      toggleEditMode
    }}>
      {children}
    </InlineEditorContext.Provider>
  );
};

export const useInlineEditor = () => {
  const context = useContext(InlineEditorContext);
  if (context === undefined) {
    throw new Error('useInlineEditor must be used within an InlineEditorProvider');
  }
  return context;
};
