
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

// Create the context with default values
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
  // Persist edit mode state in sessionStorage to maintain it during navigation
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
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState());
  const [isNavigationBlocked, setIsNavigationBlocked] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { userRole } = useAuth();
  const location = useLocation();
  const { featuresConfig } = useFeatures();

  const canEdit = userRole === 'admin' || userRole === 'sistemas';

  // Update sessionStorage when edit mode changes
  useEffect(() => {
    try {
      sessionStorage.setItem('isEditMode', isEditMode.toString());
      sessionStorage.setItem('isReorderMode', isReorderMode.toString());
      
      // Bloquear navegación cuando el modo edición está activo
      setIsNavigationBlocked(isEditMode);
      
      // Establecer que hay cambios no guardados cuando se activa el modo edición
      if (isEditMode) {
        setHasUnsavedChanges(true);
      }
    } catch (e) {
      console.error('Could not save edit mode state to sessionStorage:', e);
    }
  }, [isEditMode, isReorderMode]);

  // Advertencia de navegación cuando hay cambios no guardados
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

  // Update localStorage when sidebar state changes
  useEffect(() => {
    try {
      localStorage.setItem('isSidebarOpen', isSidebarOpen.toString());
    } catch (e) {
      console.error('Could not save sidebar state to localStorage:', e);
    }
  }, [isSidebarOpen]);

  // Disable edit mode for non-admin/non-sistemas users
  useEffect(() => {
    if (!canEdit && isEditMode) {
      setIsEditMode(false);
    }
  }, [userRole, canEdit, isEditMode]);

  // Disable edit mode if the feature is disabled
  useEffect(() => {
    const isFeatureEnabled = featuresConfig.enableInlineEditing;
    setIsEditModeEnabled(isFeatureEnabled);
    
    if (!isFeatureEnabled && isEditMode) {
      setIsEditMode(false);
      setIsReorderMode(false);
    }
  }, [featuresConfig.enableInlineEditing, isEditMode]);

  // Clear selected element when edit mode is toggled off
  useEffect(() => {
    if (!isEditMode) {
      setSelectedElementId(null);
    }
  }, [isEditMode]);

  // Automatically disable edit mode when the user navigates to a different page
  useEffect(() => {
    if (isEditMode) {
      setIsEditMode(false);
      setIsReorderMode(false);
      console.log('Edit mode automatically disabled due to navigation');
    }
  }, [location.pathname]);

  // Check for feature configuration on mount
  useEffect(() => {
    // Log the current state for debugging
    console.log('Edit mode enabled:', isEditModeEnabled);
    console.log('Can edit (role):', canEdit);
    console.log('Sidebar open:', isSidebarOpen);
    
    // Add a CSS class to the body when in edit mode for global styling
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
    if (canEdit && isEditModeEnabled) {
      const newValue = !isEditMode;
      setIsEditMode(newValue);
      
      // Always enable reorder mode when edit mode is enabled
      if (newValue) {
        setIsReorderMode(true);
        toast.info(
          "Modo edición universal activado. Ahora puedes editar o modificar cualquier elemento visible.",
          { duration: 4000 }
        );
        
        // Log status for debugging
        console.log('Edit mode activated, reorder mode also activated');
      } else {
        setIsReorderMode(false);
        setSelectedElementId(null);
        setHasUnsavedChanges(false);
        console.log('Edit mode deactivated, reorder mode also deactivated');
      }
    } else if (!isEditModeEnabled && canEdit) {
      toast.error("La funcionalidad de edición en línea está desactivada");
      console.log('Edit mode activation failed: feature disabled');
    } else if (!canEdit) {
      toast.error("No tienes permisos para activar el modo edición");
      console.log('Edit mode activation failed: insufficient permissions');
    }
  };

  // Toggle reorder mode (can only be true if edit mode is also true)
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

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    const newValue = !isSidebarOpen;
    setIsSidebarOpen(newValue);
    console.log('Sidebar toggled:', newValue ? 'open' : 'closed');
    
    // Apply a CSS class to the body for responsive layout adjustments
    if (newValue) {
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('sidebar-closed');
    } else {
      document.body.classList.add('sidebar-closed');
      document.body.classList.remove('sidebar-open');
    }
  };

  // Función para guardar borradores
  const saveDraft = async (): Promise<boolean> => {
    try {
      // Simulamos guardar los cambios como borrador
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

  // Función para cancelar la edición
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

  // Wrapper for setting the edit mode enabled state
  const setEditModeEnabled = (enabled: boolean) => {
    setIsEditModeEnabled(enabled);
    console.log('Edit mode enabled set to:', enabled);
  };

  // Function to update text content in the database
  const updateText = async (table: string, id: string, field: string, value: string): Promise<boolean> => {
    try {
      // In a real application, this would update the database
      console.log(`Updating ${field} in ${table} with ID ${id} to: ${value}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success toast
      toast.success('Contenido actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error updating text:', error);
      toast.error('Error al actualizar el contenido');
      return false;
    }
  };

  // Function to reorder elements in the database - improved for better reliability
  const reorderElements = async (table: string, elements: { id: string; order: number }[]): Promise<boolean> => {
    try {
      // In a real application, this would update the database
      console.log(`Reordering elements in ${table}:`, elements);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success toast
      toast.success('Orden actualizado correctamente');
      return true;
    } catch (error) {
      console.error('Error reordering elements:', error);
      toast.error('Error al actualizar el orden');
      return false;
    }
  };

  // Function to apply AI edits to only visible elements
  const applyAIEdit = async (element: string, prompt: string): Promise<string> => {
    try {
      console.log(`Applying AI edit to visible element with prompt: ${prompt}`);
      
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Just a mock response for now
      const result = `${element} (AI enhanced: ${prompt})`;
      
      toast.success('Edición con IA aplicada correctamente');
      return result;
    } catch (error) {
      console.error('Error applying AI edit:', error);
      toast.error('Error al aplicar edición con IA');
      return element; // Return original content on error
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
