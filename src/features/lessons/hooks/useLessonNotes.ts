
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export type LessonNote = {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const useLessonNotes = (userId?: string, lessonId?: string, courseId?: string) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Obtener la nota para una lección específica
  const { data: note, isLoading: isLoadingNote } = useQuery({
    queryKey: ["lessonNote", userId, lessonId],
    queryFn: async () => {
      try {
        if (!userId || !lessonId) return null;

        const { data, error } = await supabase
          .from("lesson_notes")
          .select("*")
          .eq("user_id", userId)
          .eq("lesson_id", lessonId)
          .maybeSingle();

        if (error) throw error;

        return data as LessonNote | null;
      } catch (error: any) {
        console.error("Error fetching lesson note:", error);
        return null;
      }
    },
    enabled: !!userId && !!lessonId,
  });

  // Obtener todas las notas de un usuario para un curso
  const { data: courseNotes, isLoading: isLoadingCourseNotes } = useQuery({
    queryKey: ["courseNotes", userId, courseId],
    queryFn: async () => {
      try {
        if (!userId || !courseId) return [];

        const { data, error } = await supabase
          .from("lesson_notes")
          .select("*")
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (error) throw error;

        return data as LessonNote[];
      } catch (error: any) {
        console.error("Error fetching course notes:", error);
        return [];
      }
    },
    enabled: !!userId && !!courseId,
  });

  // Guardar o actualizar una nota
  const saveNote = useMutation({
    mutationFn: async (content: string) => {
      try {
        if (!userId || !lessonId || !courseId) {
          throw new Error("Missing required parameters");
        }

        setIsLoading(true);

        // Verificar si ya existe una nota
        if (note) {
          // Actualizar nota existente
          const { data, error } = await supabase
            .from("lesson_notes")
            .update({ content })
            .eq("id", note.id)
            .select()
            .single();

          if (error) throw error;
          return data as LessonNote;
        } else {
          // Crear nueva nota
          const { data, error } = await supabase
            .from("lesson_notes")
            .insert({
              user_id: userId,
              lesson_id: lessonId,
              course_id: courseId,
              content,
            })
            .select()
            .single();

          if (error) throw error;
          return data as LessonNote;
        }
      } catch (error: any) {
        console.error("Error saving note:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonNote", userId, lessonId] });
      queryClient.invalidateQueries({ queryKey: ["courseNotes", userId, courseId] });
      toast({
        title: "Nota guardada",
        description: "Tu nota ha sido guardada correctamente",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "No se pudo guardar la nota",
        variant: "destructive",
      });
    },
  });

  // Eliminar una nota
  const deleteNote = useMutation({
    mutationFn: async (noteId: string) => {
      try {
        if (!userId || !noteId) {
          throw new Error("Missing required parameters");
        }

        setIsLoading(true);

        const { error } = await supabase
          .from("lesson_notes")
          .delete()
          .eq("id", noteId)
          .eq("user_id", userId);

        if (error) throw error;
      } catch (error: any) {
        console.error("Error deleting note:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessonNote", userId, lessonId] });
      queryClient.invalidateQueries({ queryKey: ["courseNotes", userId, courseId] });
      toast({
        title: "Nota eliminada",
        description: "Tu nota ha sido eliminada correctamente",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "No se pudo eliminar la nota",
        variant: "destructive",
      });
    },
  });

  return {
    note,
    courseNotes,
    isLoading: isLoading || isLoadingNote || isLoadingCourseNotes,
    saveNote,
    deleteNote,
  };
};
