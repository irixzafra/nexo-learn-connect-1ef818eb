
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isReorderMode: boolean;
  toggleReorderMode: () => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  isReorderMode: false,
  toggleReorderMode: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const { userRole } = useAuth();

  const canEdit = userRole === 'admin' || userRole === 'sistemas';

  // Disable edit mode for non-admin/non-sistemas users
  useEffect(() => {
    if (!canEdit && isEditMode) {
      setIsEditMode(false);
    }
  }, [userRole, canEdit, isEditMode]);

  // Disable reorder mode when edit mode is turned off
  useEffect(() => {
    if (!isEditMode && isReorderMode) {
      setIsReorderMode(false);
    }
  }, [isEditMode, isReorderMode]);

  const toggleEditMode = () => {
    if (canEdit) {
      setIsEditMode(prev => !prev);
      // Turn off reorder mode when disabling edit mode
      if (isEditMode && isReorderMode) {
        setIsReorderMode(false);
      }
    }
  };

  const toggleReorderMode = () => {
    if (isEditMode && canEdit) {
      setIsReorderMode(prev => !prev);
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode,
      isReorderMode,
      toggleReorderMode
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
