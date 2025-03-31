
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
});

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState(false);
  const { userRole } = useAuth();

  const canEdit = userRole === 'admin' || userRole === 'sistemas';

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

  // Disable reorder mode when edit mode is turned off
  useEffect(() => {
    if (!isEditMode && isReorderMode) {
      setIsReorderMode(false);
    }
  }, [isEditMode, isReorderMode]);

  // Check for feature configuration on mount
  useEffect(() => {
    // Here we would check from a settings service if the edit mode and reorder mode are enabled
    console.log('Checking edit mode and reorder mode feature configuration');
    
    // By default, we'll set it to false. In a real app, this would be loaded from the backend
    // We'll use the feature toggles to control this later
    setIsEditModeEnabled(false);
  }, []);

  const toggleEditMode = () => {
    if (canEdit && isEditModeEnabled) {
      setIsEditMode(prev => !prev);
      // Turn off reorder mode when disabling edit mode
      if (isEditMode && isReorderMode) {
        setIsReorderMode(false);
      }
    } else if (!isEditModeEnabled && canEdit) {
      toast.error("La funcionalidad de edición en línea está desactivada");
    }
  };

  const toggleReorderMode = () => {
    if (isEditMode && canEdit && isEditModeEnabled) {
      setIsReorderMode(prev => !prev);
      // Mostrar tutorial o guía al activar el modo reordenación por primera vez
      if (!isReorderMode) {
        toast.info(
          "Modo reordenación activado. Arrastra los elementos para cambiar su orden o usa los botones de flechas.",
          { duration: 4000 }
        );
      }
    }
  };

  // Function to update text content in the database
  const updateText = async (table: string, id: string, field: string, value: string): Promise<boolean> => {
    try {
      // In a real application, this would update the database
      // For now, we'll simulate a successful update
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

  // Function to reorder elements in the database
  const reorderElements = async (table: string, elements: { id: string; order: number }[]): Promise<boolean> => {
    try {
      // In a real application, this would update the database
      // For now, we'll simulate a successful update
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

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode,
      isReorderMode,
      toggleReorderMode,
      isEditModeEnabled,
      setEditModeEnabled,
      updateText,
      reorderElements
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
