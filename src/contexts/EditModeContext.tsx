
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { useFeature } from '@/hooks/useFeatures';

// Define the context shape
interface EditModeContextProps {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isEditModeEnabled: boolean;
  canEdit: boolean;
  saveDraft: () => Promise<void>;
  cancelEditing: () => void;
  undoChange: () => void;
  redoChange: () => void;
  hasUndoHistory: boolean;
  hasRedoHistory: boolean;
  pendingChanges: Record<string, any>;
  setPendingChanges: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

// Create the context with a default value
const EditModeContext = createContext<EditModeContextProps>({
  isEditMode: false,
  toggleEditMode: () => {},
  isEditModeEnabled: false,
  canEdit: false,
  saveDraft: async () => {},
  cancelEditing: () => {},
  undoChange: () => {},
  redoChange: () => {},
  hasUndoHistory: false,
  hasRedoHistory: false,
  pendingChanges: {},
  setPendingChanges: () => {},
});

interface EditModeProviderProps {
  children: ReactNode;
}

// Edit mode provider component
export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const inlineEditingEnabled = useFeature("enableInlineEditing");
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(inlineEditingEnabled);
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<Array<Record<string, any>>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [navigationBlocked, setNavigationBlocked] = useState(false);
  
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user can edit based on role
  const canEdit = userRole === 'admin' || userRole === 'editor';
  
  // Reset edit mode when route changes
  useEffect(() => {
    if (isEditMode) {
      setIsEditMode(false);
    }
  }, [location.pathname]);
  
  // Block navigation if there are unsaved changes
  useEffect(() => {
    const hasPendingChanges = Object.keys(pendingChanges).length > 0;
    setNavigationBlocked(isEditMode && hasPendingChanges);
    
    // Add a confirmation dialog when user tries to leave the page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditMode && hasPendingChanges) {
        e.preventDefault();
        e.returnValue = ''; // This is required for the confirmation dialog to show
        return '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditMode, pendingChanges]);
  
  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (!isEditMode) {
      // Entering edit mode
      setIsEditMode(true);
      setPendingChanges({});
      setHistory([]);
      setHistoryIndex(-1);
      document.body.classList.add('edit-mode-active');
    } else {
      // Exiting edit mode - ask for confirmation if there are unsaved changes
      if (Object.keys(pendingChanges).length > 0) {
        if (window.confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir del modo de edición?')) {
          exitEditMode();
        }
      } else {
        exitEditMode();
      }
    }
  }, [isEditMode, pendingChanges]);
  
  // Helper function to exit edit mode
  const exitEditMode = () => {
    setIsEditMode(false);
    setPendingChanges({});
    setHistory([]);
    setHistoryIndex(-1);
    document.body.classList.remove('edit-mode-active');
  };
  
  // Save draft
  const saveDraft = async () => {
    try {
      // In a real app, you would save the changes to the backend here
      console.log('Saving changes:', pendingChanges);
      
      // For now, just show a success message
      toast.success('Cambios guardados correctamente');
      
      // Clear pending changes
      setPendingChanges({});
      setHistory([]);
      setHistoryIndex(-1);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Error al guardar los cambios');
      return Promise.reject(error);
    }
  };
  
  // Cancel editing
  const cancelEditing = () => {
    if (Object.keys(pendingChanges).length > 0) {
      if (window.confirm('¿Estás seguro de que quieres descartar los cambios?')) {
        exitEditMode();
      }
    } else {
      exitEditMode();
    }
  };
  
  // Add a change to the history
  const addToHistory = useCallback((change: Record<string, any>) => {
    setHistory(prev => {
      // If we're not at the end of the history, truncate it
      const newHistory = historyIndex < prev.length - 1
        ? prev.slice(0, historyIndex + 1)
        : prev;
      
      return [...newHistory, change];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);
  
  // Update pending changes
  useEffect(() => {
    if (Object.keys(pendingChanges).length > 0) {
      addToHistory(pendingChanges);
    }
  }, [pendingChanges, addToHistory]);
  
  // Undo the last change
  const undoChange = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setPendingChanges(history[historyIndex - 1]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setPendingChanges({});
    }
  }, [history, historyIndex]);
  
  // Redo a previously undone change
  const redoChange = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setPendingChanges(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);
  
  // Determine if we have undo/redo history
  const hasUndoHistory = historyIndex >= 0;
  const hasRedoHistory = historyIndex < history.length - 1;
  
  // Provide the context value
  const contextValue = {
    isEditMode,
    toggleEditMode,
    isEditModeEnabled,
    canEdit,
    saveDraft,
    cancelEditing,
    undoChange,
    redoChange,
    hasUndoHistory,
    hasRedoHistory,
    pendingChanges,
    setPendingChanges,
  };

  return (
    <EditModeContext.Provider value={contextValue}>
      {navigationBlocked && (
        <div className="edit-navigation-blocker">
          <span>Tienes cambios sin guardar. Guarda o descarta los cambios antes de navegar.</span>
        </div>
      )}
      {children}
    </EditModeContext.Provider>
  );
};

// Custom hook to use the edit mode context
export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
