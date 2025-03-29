
import React, { createContext, useContext, useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  updateText: (table: string, id: string, field: string, value: string) => Promise<boolean>;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      const newState = !prev;
      if (newState) {
        toast({
          title: "Modo de edición activado",
          description: "Ahora puedes editar los textos haciendo clic en ellos.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Modo de edición desactivado",
          description: "Los cambios han sido guardados.",
          duration: 3000,
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
        toast({
          title: "Error al guardar",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Guardado con éxito",
        description: `El campo ${field} ha sido actualizado.`,
        duration: 2000,
      });
      return true;
    } catch (error) {
      console.error('Error updating text:', error);
      toast({
        title: "Error al guardar",
        description: "Ha ocurrido un error al actualizar el texto.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, updateText }}>
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
