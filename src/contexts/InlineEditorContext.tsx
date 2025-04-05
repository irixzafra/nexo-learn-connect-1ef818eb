
import React, { createContext, useContext, useState, useEffect } from 'react';
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
  
  // Solo los administradores pueden usar el modo de edición
  const isAdmin = userRole === 'admin';
  
  useEffect(() => {
    // Si el usuario no es administrador, desactivamos el modo de edición
    if (!isAdmin) {
      setIsEditModeEnabled(false);
    }
  }, [isAdmin]);

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
