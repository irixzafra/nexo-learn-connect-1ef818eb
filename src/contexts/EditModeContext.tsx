
import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateText: (table: string, id: string, field: string, value: string) => Promise<boolean>;
  reorderElements?: (table: string, elements: Array<{ id: string, order: number }>) => Promise<boolean>;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const newState = !prev;
      if (newState) {
        toast.success("Modo de edición activado", {
          description: "Ahora puedes editar los textos haciendo clic en ellos."
        });
      } else {
        toast.success("Modo de edición desactivado", {
          description: "Los cambios han sido guardados."
        });
      }
      return newState;
    });
  };

  const updateText = async (table: string, id: string, field: string, value: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ [field]: value })
        .eq('id', id);

      if (error) {
        console.error('Error updating text:', error);
        toast.error("Error al guardar", {
          description: error.message
        });
        return false;
      }

      toast.success("Guardado con éxito", {
        description: `El campo ${field} ha sido actualizado.`
      });
      return true;
    } catch (error) {
      console.error('Error updating text:', error);
      toast.error("Error al guardar", {
        description: "Ha ocurrido un error al actualizar el texto."
      });
      return false;
    }
  };

  const reorderElements = async (table: string, elements: Array<{ id: string, order: number }>): Promise<boolean> => {
    try {
      // Create an array of updates to perform
      const updates = elements.map(element => ({
        id: element.id,
        [element.order.toString().includes('_order') ? element.order.toString() : 'display_order']: element.order
      }));

      // Update all elements in a single batch operation
      const { error } = await supabase
        .from(table)
        .upsert(updates);

      if (error) {
        console.error('Error reordering elements:', error);
        toast.error("Error al reordenar elementos", {
          description: error.message
        });
        return false;
      }

      toast.success("Elementos reordenados", {
        description: "Los elementos han sido reordenados correctamente."
      });
      return true;
    } catch (error) {
      console.error('Error reordering elements:', error);
      toast.error("Error al reordenar elementos", {
        description: "Ha ocurrido un error al reordenar los elementos."
      });
      return false;
    }
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, updateText, reorderElements }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = (): EditModeContextType => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
