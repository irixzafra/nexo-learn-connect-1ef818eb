
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

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

  const [isEditMode, setIsEditMode] = useState(getInitialEditMode());
  const [isReorderMode, setIsReorderMode] = useState(getInitialReorderMode());
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const { userRole } = useAuth();

  const canEdit = userRole === 'admin' || userRole === 'sistemas';

  // Update sessionStorage when edit mode changes
  useEffect(() => {
    try {
      sessionStorage.setItem('isEditMode', isEditMode.toString());
      sessionStorage.setItem('isReorderMode', isReorderMode.toString());
    } catch (e) {
      console.error('Could not save edit mode state to sessionStorage:', e);
    }
  }, [isEditMode, isReorderMode]);

  // Disable edit mode for non-admin/non-sistemas users
  useEffect(() => {
    if (!canEdit && isEditMode) {
      setIsEditMode(false);
    }
  }, [userRole, canEdit, isEditMode]);

  // Disable edit mode if the feature is disabled
  useEffect(() => {
    if (!isEditModeEnabled && isEditMode) {
      setIsEditMode(false);
      setIsReorderMode(false);
    }
  }, [isEditModeEnabled, isEditMode]);

  // Clear selected element when edit mode is toggled off
  useEffect(() => {
    if (!isEditMode) {
      setSelectedElementId(null);
    }
  }, [isEditMode]);

  // Check for feature configuration on mount
  useEffect(() => {
    // By default, we'll set it to true
    setIsEditModeEnabled(true);
    
    // Log the current state for debugging
    console.log('Edit mode enabled:', isEditModeEnabled);
    console.log('Can edit (role):', canEdit);
    
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
          "Modo edición universal activado. Ahora puedes editar, reordenar o modificar cualquier elemento visible.",
          { duration: 4000 }
        );
        
        // Log status for debugging
        console.log('Edit mode activated, reorder mode also activated');
      } else {
        setIsReorderMode(false);
        setSelectedElementId(null);
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
      setSelectedElementId
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
