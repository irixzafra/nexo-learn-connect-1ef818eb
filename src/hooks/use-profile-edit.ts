
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types/auth";
import { toast } from "sonner";

interface ProfileUpdateData {
  full_name: string;
}

export function useProfileEdit(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileUpdateData) => {
      if (!userId) {
        throw new Error("Usuario no identificado");
      }

      const { error } = await supabase
        .from("profiles")
        .update({ 
          full_name: data.full_name,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (error) {
        console.error("Error al actualizar el perfil:", error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      // Invalidar consultas relevantes para actualizar los datos en la UI
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      
      toast.success("Perfil actualizado", {
        description: "Tu información ha sido actualizada correctamente."
      });
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
      toast.error("No se pudo actualizar el perfil", {
        description: error instanceof Error ? error.message : "Por favor, inténtalo de nuevo."
      });
    }
  });
}
