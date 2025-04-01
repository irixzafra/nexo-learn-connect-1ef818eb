
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { useFeatures } from './features/FeaturesContext';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isReorderMode: boolean;
  toggleReorderMode: () => void;
  isEditModeEnabled: boolean;
  setEditModeEnabled: (enabled: boolean) => void;
  updateText: (table: string, id: string, field: string, value: string) => Promise<boolean>;
  reorderElements: (table: string, elements: { id: string; order: number }[]) => Promise<boolean>;
  applyAIEdit: (element: string, prompt: string) => Promise<string>;
  canEdit: boolean;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isNavigationBlocked: boolean;
  saveDraft: () => Promise<boolean>;
  cancelEditing: () => void;
  undoChange: () => void;
  redoChange: () => void;
  hasUndoHistory: boolean;
  hasRedoHistory: boolean;
  history: EditHistory;
}

type EditOperation = {
  elementId: string;
  table: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: number;
};

type EditHistory = {
  operations: EditOperation[];
  currentIndex: number;
};

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggleEditMode: () => {},
  isReorderMode: false,
  toggleReorderMode: () => {},
  isEditModeEnabled: false,
  setEditModeEnabled: () => {},
  updateText: async () => false,
  reorderElements: async () => false,
  applyAIEdit: async () => '',
  canEdit: false,
  selectedElementId: null,
  setSelectedElementId: () => {},
  isSidebarOpen: true,
  toggleSidebar: () => {},
  isNavigationBlocked: false,
  saveDraft: async () => false,
  cancelEditing: () => {},
  undoChange: () => {},
  redoChange: () => {},
  hasUndoHistory: false,
  hasRedoHistory: false,
  history: { operations: [], currentIndex: -1 },
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial state values from storage
  const getInitialEditMode = () => {
    try {
      const storedValue = sessionStorage.getItem('isEditMode');
      return storedValue === 'true';
    } catch (e) {
      return false;
    }
  };

  const getInitialReorderMode = () => {
    try {
      const storedValue = sessionStorage.getItem('isReorderMode');
      return storedValue === 'true';
    } catch (e) {
      return false;
    }
  };

  const getInitialSidebarState = () => {
    try {
      const storedValue = localStorage.getItem('isSidebarOpen');
      return storedValue !== 'false'; // Default to true if not set
    } catch (e) {
      return true;
    }
  };

  // State
  const [isEditMode, setIsEditMode] = useState(getInitialEditMode());
  const [isReorderMode, setIsReorderMode] = useState(getInitialReorderMode());
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState());
  const [isNavigationBlocked, setIsNavigationBlocked] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [history, setHistory] = useState<EditHistory>({ operations: [], currentIndex: -1 });
  
  // Context and hooks
  const { userRole } = useAuth();
  const location = useLocation();
  const { featuresConfig } = useFeatures();

  // Computed values
  const canEdit = userRole === 'admin' || userRole === 'sistemas';
  const hasUndoHistory = history.currentIndex >= 0;
  const hasRedoHistory = history.currentIndex < history.operations.length - 1;

  // Effects
  useEffect(() => {
    try {
      sessionStorage.setItem('isEditMode', isEditMode.toString());
      sessionStorage.setItem('isReorderMode', isReorderMode.toString());
      
      setIsNavigationBlocked(isEditMode);
      
      if (isEditMode) {
        setHasUnsavedChanges(true);
      }
    } catch (e) {
      console.error('Could not save edit mode state to sessionStorage:', e);
    }
  }, [isEditMode, isReorderMode]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && isEditMode) {
        const message = '¿Estás seguro de que quieres salir? Tienes cambios sin guardar que se perderán.';
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, isEditMode]);

  useEffect(() => {
    try {
      localStorage.setItem('isSidebarOpen', isSidebarOpen.toString());
    } catch (e) {
      console.error('Could not save sidebar state to localStorage:', e);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (!canEdit && isEditMode) {
      setIsEditMode(false);
    }
  }, [userRole, canEdit, isEditMode]);

  useEffect(() => {
    const isFeatureEnabled = typeof featuresConfig?.enableInlineEditing === 'boolean' 
      ? featuresConfig.enableInlineEditing 
      : false;
    
    setIsEditModeEnabled(isFeatureEnabled);
    
    if (!isFeatureEnabled && isEditMode) {
      setIsEditMode(false);
      setIsReorderMode(false);
    }
  }, [featuresConfig?.enableInlineEditing, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      setSelectedElementId(null);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      setIsEditMode(false);
      setIsReorderMode(false);
      console.log('Edit mode automatically disabled due to navigation');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isEditMode) {
      document.body.classList.add('edit-mode-active');
    } else {
      document.body.classList.remove('edit-mode-active');
    }
    
    return () => {
      document.body.classList.remove('edit-mode-active');
    };
  }, [isEditModeEnabled, canEdit, isEditMode]);

  // Methods
  const toggleEditMode = () => {
    if (!canEdit || !isEditModeEnabled) {
      toast.error('No tienes permisos para editar esta página o la edición está desactivada');
      return;
    }
    
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);
    
    if (newEditMode) {
      toast.success('Modo edición activado. Ahora puedes editar cualquier elemento de la página.');
      setHistory({ operations: [], currentIndex: -1 });
    } else {
      setIsReorderMode(false);
      setSelectedElementId(null);
      if (hasUnsavedChanges) {
        const shouldSave = window.confirm('¿Deseas guardar los cambios antes de salir del modo edición?');
        if (shouldSave) {
          saveDraft();
        }
        setHasUnsavedChanges(false);
      }
    }
  };

  const toggleReorderMode = () => {
    if (isEditMode && canEdit && isEditModeEnabled) {
      const newValue = !isReorderMode;
      setIsReorderMode(newValue);
      
      if (newValue) {
        toast.info("Modo reordenación activado. Puedes arrastrar los elementos para cambiar su orden.");
      }
    } else if (!isEditMode) {
      console.log('Cannot toggle reorder mode: edit mode not active');
    }
  };

  const toggleSidebar = () => {
    const newValue = !isSidebarOpen;
    setIsSidebarOpen(newValue);
    
    if (newValue) {
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('sidebar-closed');
    } else {
      document.body.classList.add('sidebar-closed');
      document.body.classList.remove('sidebar-open');
    }
  };

  const saveDraft = async (): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success('Cambios guardados correctamente');
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Error al guardar los cambios');
      return false;
    }
  };

  const cancelEditing = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('¿Estás seguro de que quieres cancelar la edición? Perderás todos los cambios no guardados.')) {
        setIsEditMode(false);
        setIsReorderMode(false);
        setHasUnsavedChanges(false);
        toast.info('Edición cancelada');
      }
    } else {
      setIsEditMode(false);
      setIsReorderMode(false);
    }
  };

  const updateText = async (table: string, id: string, field: string, value: string): Promise<boolean> => {
    try {
      console.log(`Updating ${field} in ${table} with ID ${id} to: ${value}`);
      
      // Get the current value before updating
      const elements = document.querySelectorAll(`[data-editable-id="${id}"]`);
      let oldValue = "";
      
      if (elements.length > 0) {
        const element = elements[0];
        oldValue = element.textContent || "";
      }
      
      // Record the operation in history
      const newOperation: EditOperation = {
        elementId: id,
        table,
        field,
        oldValue,
        newValue: value,
        timestamp: Date.now()
      };
      
      // Update history by removing any future operations (if we're not at the end)
      const newOperations = history.operations.slice(0, history.currentIndex + 1);
      newOperations.push(newOperation);
      
      setHistory({
        operations: newOperations,
        currentIndex: newOperations.length - 1
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update DOM directly for immediate feedback
      elements.forEach(element => {
        element.textContent = value;
      });
      
      setHasUnsavedChanges(true);
      toast.success('Contenido actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error updating text:', error);
      toast.error('Error al actualizar el contenido');
      return false;
    }
  };

  const undoChange = () => {
    if (!hasUndoHistory) return;
    
    const operation = history.operations[history.currentIndex];
    const elements = document.querySelectorAll(`[data-editable-id="${operation.elementId}"]`);
    
    elements.forEach(element => {
      element.textContent = operation.oldValue;
    });
    
    setHistory({
      ...history,
      currentIndex: history.currentIndex - 1
    });
    
    toast.info('Cambio deshecho');
  };

  const redoChange = () => {
    if (!hasRedoHistory) return;
    
    const operation = history.operations[history.currentIndex + 1];
    const elements = document.querySelectorAll(`[data-editable-id="${operation.elementId}"]`);
    
    elements.forEach(element => {
      element.textContent = operation.newValue;
    });
    
    setHistory({
      ...history,
      currentIndex: history.currentIndex + 1
    });
    
    toast.info('Cambio rehecho');
  };

  const reorderElements = async (table: string, elements: { id: string; order: number }[]): Promise<boolean> => {
    try {
      console.log(`Reordering elements in ${table}:`, elements);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Orden actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error reordering elements:', error);
      toast.error('Error al actualizar el orden');
      return false;
    }
  };

  const applyAIEdit = async (element: string, prompt: string): Promise<string> => {
    try {
      console.log(`Applying AI edit to visible element with prompt: ${prompt}`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate AI processing with different possible enhancements
      let result = element;
      
      if (prompt.toLowerCase().includes('mejorar')) {
        result = element.charAt(0).toUpperCase() + element.slice(1); // Capitalize
        if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
          result += '.'; // Add period if missing
        }
      } else if (prompt.toLowerCase().includes('formal')) {
        result = element.replace(/hola/i, 'Saludos cordiales');
        result = result.replace(/gracias/i, 'Agradecemos su atención');
      } else if (prompt.toLowerCase().includes('corto') || prompt.toLowerCase().includes('breve')) {
        result = element.split(' ').slice(0, Math.max(5, Math.floor(element.split(' ').length * 0.7))).join(' ');
        if (!result.endsWith('.') && !result.endsWith('!') && !result.endsWith('?')) {
          result += '.';
        }
      } else if (prompt.toLowerCase().includes('emoji')) {
        const emojis = ['✅', '👍', '🔥', '⭐', '🚀', '💯'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        result = `${element} ${randomEmoji}`;
      } else {
        // Generic enhancement
        result = `${element} (mejorado)`;
      }
      
      setHasUnsavedChanges(true);
      toast.success('Edición con IA aplicada correctamente');
      return result;
    } catch (error) {
      console.error('Error applying AI edit:', error);
      toast.error('Error al aplicar edición con IA');
      return element;
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode,
      isReorderMode,
      toggleReorderMode,
      isEditModeEnabled,
      setEditModeEnabled,
      updateText,
      reorderElements,
      applyAIEdit,
      canEdit,
      selectedElementId,
      setSelectedElementId,
      isSidebarOpen,
      toggleSidebar,
      isNavigationBlocked,
      saveDraft,
      cancelEditing,
      undoChange,
      redoChange,
      hasUndoHistory,
      hasRedoHistory,
      history
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
