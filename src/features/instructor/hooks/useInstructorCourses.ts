
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Course } from "@/types/course";

export const useInstructorCourses = (instructorId?: string) => {
  const { data: courses = [], isLoading, error, refetch } = useQuery({
    queryKey: ["instructorCourses", instructorId],
    queryFn: async () => {
      try {
        if (!instructorId) return [];

        const { data, error } = await supabase
          .from("courses")
          .select("id, title, description, price, currency, instructor_id, created_at, updated_at, is_published, cover_image_url, level, duration_text")
          .eq("instructor_id", instructorId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        return data as Course[];
      } catch (error: any) {
        console.error("Error fetching instructor courses:", error);
        toast.error("No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.");
        return [];
      }
    },
    enabled: !!instructorId,
    retry: 1,
    retryDelay: 1000,
  });

  return { courses, isLoading, error, refetch };
};
