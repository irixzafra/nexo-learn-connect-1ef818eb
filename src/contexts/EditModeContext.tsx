
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';

export interface EditHistoryItem {
  id: string;
  timestamp: number;
  element: {
    id: string;
    type: string;
    content: string;
  };
  before: string;
  after: string;
  user: {
    id: string;
    name: string;
  };
}

export interface EditModeContextProps {
  isEditModeEnabled: boolean;
  toggleEditMode: () => void;
  setIsEditModeEnabled: (enabled: boolean) => void;
  editHistory: EditHistoryItem[];
  addToHistory: (historyItem: Omit<EditHistoryItem, 'timestamp'>) => void;
  clearHistory: () => void;
  isNavigationBlocked: boolean;
  setNavigationBlocked: (blocked: boolean) => void;
  updateText: (elementId: string, newText: string) => Promise<boolean>;
  applyAIEdit: (elementId: string, prompt: string) => Promise<boolean>;
  isReorderMode: boolean;
  toggleReorderMode: () => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  reorderElements: (elementIds: string[]) => void;
}

const EditModeContext = createContext<EditModeContextProps | undefined>(undefined);

interface EditModeProviderProps {
  children: ReactNode;
  userRole?: UserRoleType;
}

export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children, userRole = 'student' }) => {
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [editHistory, setEditHistory] = useState<EditHistoryItem[]>([]);
  const [isNavigationBlocked, setNavigationBlocked] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  
  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (userRole === 'admin' || userRole === 'instructor' || userRole === 'content_creator') {
      setIsEditModeEnabled(prev => !prev);
      // When disabling edit mode, also disable reorder mode
      if (isEditModeEnabled) {
        setIsReorderMode(false);
        setSelectedElementId(null);
      }
    }
  }, [isEditModeEnabled, userRole]);
  
  // Toggle reorder mode
  const toggleReorderMode = useCallback(() => {
    if (isEditModeEnabled) {
      setIsReorderMode(prev => !prev);
      if (!isReorderMode) {
        // When enabling reorder mode, clear selection
        setSelectedElementId(null);
      }
    }
  }, [isEditModeEnabled, isReorderMode]);
  
  // Add item to edit history
  const addToHistory = useCallback((historyItem: Omit<EditHistoryItem, 'timestamp'>) => {
    const newItem = {
      ...historyItem,
      timestamp: Date.now()
    };
    setEditHistory(prev => [newItem, ...prev]);
  }, []);
  
  // Clear edit history
  const clearHistory = useCallback(() => {
    setEditHistory([]);
  }, []);
  
  // Update text element
  const updateText = useCallback(async (elementId: string, newText: string): Promise<boolean> => {
    // Implementation would connect to API to save changes
    console.log(`Updated element ${elementId} with text: ${newText}`);
    
    // Add to history
    addToHistory({
      id: `edit-${Date.now()}`,
      element: {
        id: elementId,
        type: 'text',
        content: newText
      },
      before: 'Previous content',
      after: newText,
      user: {
        id: '1',
        name: 'Current User'
      }
    });
    
    return true;
  }, [addToHistory]);
  
  // Apply AI edit
  const applyAIEdit = useCallback(async (elementId: string, prompt: string): Promise<boolean> => {
    // Implementation would call AI service
    console.log(`Applied AI edit to element ${elementId} with prompt: ${prompt}`);
    
    // Mock implementation
    const aiResponse = `AI-improved content for "${prompt}"`;
    
    // Add to history
    addToHistory({
      id: `ai-edit-${Date.now()}`,
      element: {
        id: elementId,
        type: 'text',
        content: aiResponse
      },
      before: 'Previous content',
      after: aiResponse,
      user: {
        id: '1',
        name: 'AI Assistant'
      }
    });
    
    return true;
  }, [addToHistory]);
  
  // Reorder elements
  const reorderElements = useCallback((elementIds: string[]) => {
    console.log('Reordering elements:', elementIds);
    // Implementation would update element order in database
  }, []);
  
  // Check permissions when user role changes
  useEffect(() => {
    if (userRole !== 'admin' && userRole !== 'instructor' && userRole !== 'content_creator' && userRole !== 'editor') {
      setIsEditModeEnabled(false);
      setIsReorderMode(false);
    }
  }, [userRole]);
  
  const contextValue: EditModeContextProps = {
    isEditModeEnabled,
    toggleEditMode,
    setIsEditModeEnabled,
    editHistory,
    addToHistory,
    clearHistory,
    isNavigationBlocked,
    setNavigationBlocked,
    updateText,
    applyAIEdit,
    isReorderMode,
    toggleReorderMode,
    selectedElementId,
    setSelectedElementId,
    reorderElements
  };
  
  return (
    <EditModeContext.Provider value={contextValue}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = (): EditModeContextProps => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};

// Hook to check if elements are editable
export const useCanEdit = (elementType?: string): boolean => {
  const { isEditModeEnabled } = useEditMode();
  
  // Logic to determine if the current user can edit this specific element type
  // This can be expanded based on user roles, permissions, etc.
  return isEditModeEnabled;
};

export default EditModeContext;
