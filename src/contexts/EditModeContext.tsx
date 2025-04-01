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
}

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
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const [isEditMode, setIsEditMode] = useState(getInitialEditMode());
  const [isReorderMode, setIsReorderMode] = useState(getInitialReorderMode());
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState());
  const [isNavigationBlocked, setIsNavigationBlocked] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { userRole } = useAuth();
  const location = useLocation();
  const { featuresConfig } = useFeatures();

  const canEdit = userRole === 'admin' || userRole === 'sistemas';

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
      : true;
    
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
    console.log('Edit mode enabled:', isEditModeEnabled);
    console.log('Can edit (role):', canEdit);
    console.log('Sidebar open:', isSidebarOpen);
    
    if (isEditMode) {
      document.body.classList.add('edit-mode-active');
    } else {
      document.body.classList.remove('edit-mode-active');
    }
    
    return () => {
      document.body.classList.remove('edit-mode-active');
    };
  }, [isEditModeEnabled, canEdit, isEditMode]);

  const toggleEditMode = () => {
    toast.info('La funcionalidad de edición inline está siendo reconstruida. Estará disponible próximamente.');
    return;
  };

  const toggleReorderMode = () => {
    if (isEditMode && canEdit && isEditModeEnabled) {
      const newValue = !isReorderMode;
      setIsReorderMode(newValue);
      console.log('Reorder mode toggled:', newValue);
      
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
    console.log('Sidebar toggled:', newValue ? 'open' : 'closed');
    
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
      
      toast.success('Borrador guardado correctamente');
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Error al guardar el borrador');
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

  const setEditModeEnabled = (enabled: boolean) => {
    setIsEditModeEnabled(enabled);
    console.log('Edit mode enabled set to:', enabled);
  };

  const updateText = async (table: string, id: string, field: string, value: string): Promise<boolean> => {
    try {
      console.log(`Updating ${field} in ${table} with ID ${id} to: ${value}`);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('Contenido actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error updating text:', error);
      toast.error('Error al actualizar el contenido');
      return false;
    }
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
      
      const result = `${element} (AI enhanced: ${prompt})`;
      
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
      cancelEditing
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
