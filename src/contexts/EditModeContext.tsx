
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Define context type with all properties
export interface EditModeContextProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateText: (id: string, value: string) => void;
  canEdit: boolean;
  saveDraft: () => void;
  cancelEditing: () => void;
  undoChange: () => void;
  redoChange: () => void;
  hasUndoHistory: boolean;
  hasRedoHistory: boolean;
}

// Create context with default values
const EditModeContext = createContext<EditModeContextProps>({
  isEditMode: false,
  toggleEditMode: () => {},
  updateText: () => {},
  canEdit: false,
  saveDraft: () => {},
  cancelEditing: () => {},
  undoChange: () => {},
  redoChange: () => {},
  hasUndoHistory: false,
  hasRedoHistory: false,
});

interface EditModeProviderProps {
  children: ReactNode;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editHistory, setEditHistory] = useState<Array<Record<string, string>>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const { userRole } = useAuth();

  // Check if user has edit permissions
  const canEdit = userRole === 'admin' || userRole === 'instructor' || userRole === 'sistemas';

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (!canEdit) return;
    setIsEditMode(prev => !prev);
  }, [canEdit]);

  // Update text function - for editing content
  const updateText = useCallback((id: string, value: string) => {
    if (!isEditMode) return;
    
    // Add the change to history
    setEditHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyIndex + 1);
      newHistory.push({ [id]: value });
      return newHistory;
    });
    
    setHistoryIndex(prevIndex => prevIndex + 1);
    
    // In a real implementation, this would update a state or dispatch to a store
    console.log(`Updated: ${id} with value: ${value}`);
  }, [isEditMode, historyIndex]);

  // Save draft - would normally save to database
  const saveDraft = useCallback(() => {
    if (!isEditMode) return;
    console.log('Saving draft...');
    // Implement actual saving logic
  }, [isEditMode]);

  // Cancel editing - revert changes
  const cancelEditing = useCallback(() => {
    if (!isEditMode) return;
    setIsEditMode(false);
    console.log('Canceling edit mode...');
    // Implement actual cancel logic - e.g. revert to original content
  }, [isEditMode]);

  // Undo last change
  const undoChange = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prevIndex => prevIndex - 1);
      console.log('Undoing last change...');
    }
  }, [historyIndex]);

  // Redo previously undone change
  const redoChange = useCallback(() => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(prevIndex => prevIndex + 1);
      console.log('Redoing change...');
    }
  }, [historyIndex, editHistory.length]);

  // Check if there's history to undo/redo
  const hasUndoHistory = historyIndex > 0;
  const hasRedoHistory = historyIndex < editHistory.length - 1;

  const value = {
    isEditMode,
    toggleEditMode,
    updateText,
    canEdit,
    saveDraft,
    cancelEditing,
    undoChange,
    redoChange,
    hasUndoHistory,
    hasRedoHistory,
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
};

// Hook for using edit mode context
export const useEditMode = () => useContext(EditModeContext);
