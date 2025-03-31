
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from '@/lib/supabase';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateText: (table: string, id: string, field: string, value: string) => Promise<boolean>;
  reorderElements: (table: string, elements: Array<{ id: string, order: number }>) => Promise<boolean>;
  addElement?: (table: string, data: Record<string, any>) => Promise<string | null>;
  removeElement?: (table: string, id: string) => Promise<boolean>;
}

const EDIT_MODE_LOCAL_STORAGE_KEY = 'nexo_edit_mode';

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Inicializar el estado desde localStorage para persistencia entre páginas
  const [isEditMode, setIsEditMode] = useState(() => {
    const savedState = localStorage.getItem(EDIT_MODE_LOCAL_STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : false;
  });

  // Guardar el estado en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(EDIT_MODE_LOCAL_STORAGE_KEY, JSON.stringify(isEditMode));
  }, [isEditMode]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const newState = !prev;
      if (newState) {
        toast.success("Modo de edición activado", {
          description: "Ahora puedes editar los textos haciendo clic en ellos y reordenar elementos."
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
      // Validar que la tabla exista antes de intentar actualizar
      const { error: checkError, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
        .eq('id', id);
        
      if (checkError) {
        console.error('Error verificando tabla:', checkError);
        toast.error("Error al guardar", {
          description: `La tabla ${table} no existe o no es accesible: ${checkError.message}`
        });
        return false;
      }
      
      if (count === 0) {
        toast.error("Error al guardar", {
          description: `No se encontró el registro con ID ${id} en la tabla ${table}`
        });
        return false;
      }

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
      // Validar que la tabla exista antes de intentar actualizar
      const { error: checkError } = await supabase
        .from(table)
        .select('id', { head: true })
        .limit(1);
        
      if (checkError) {
        console.error('Error verificando tabla:', checkError);
        toast.error("Error de configuración", {
          description: `La tabla ${table} no existe o no es accesible: ${checkError.message}`
        });
        return false;
      }

      // Verificar el nombre correcto de la columna de orden para esta tabla
      const { data: columnInfo } = await supabase
        .rpc('get_table_columns', { table_name: table });
      
      const hasDisplayOrder = columnInfo && columnInfo.some(
        (col: {column_name: string}) => col.column_name === 'display_order'
      );
      
      const orderColumnName = hasDisplayOrder ? 'display_order' : 'order';
      console.log(`Usando columna de orden: ${orderColumnName} para tabla ${table}`);
      
      // Create an array of updates to perform
      const updates = elements.map(element => ({
        id: element.id,
        [orderColumnName]: element.order
      }));

      console.log('Actualizando elementos:', updates);

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

  const addElement = async (table: string, data: Record<string, any>): Promise<string | null> => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select('id')
        .single();

      if (error) {
        console.error('Error adding element:', error);
        toast.error("Error al añadir elemento", {
          description: error.message
        });
        return null;
      }

      toast.success("Elemento añadido", {
        description: "El nuevo elemento ha sido añadido correctamente."
      });
      return result.id;
    } catch (error) {
      console.error('Error adding element:', error);
      toast.error("Error al añadir elemento", {
        description: "Ha ocurrido un error al añadir el elemento."
      });
      return null;
    }
  };

  const removeElement = async (table: string, id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing element:', error);
        toast.error("Error al eliminar elemento", {
          description: error.message
        });
        return false;
      }

      toast.success("Elemento eliminado", {
        description: "El elemento ha sido eliminado correctamente."
      });
      return true;
    } catch (error) {
      console.error('Error removing element:', error);
      toast.error("Error al eliminar elemento", {
        description: "Ha ocurrido un error al eliminar el elemento."
      });
      return false;
    }
  };

  return (
    <EditModeContext.Provider value={{ 
      isEditMode, 
      toggleEditMode, 
      updateText, 
      reorderElements,
      addElement,
      removeElement 
    }}>
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
