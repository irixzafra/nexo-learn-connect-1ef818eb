
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Course } from "@/types/course";

export const useInstructorCourses = (instructorId?: string) => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["instructorCourses", instructorId],
    queryFn: async () => {
      try {
        if (!instructorId) return [];

        const { data, error } = await supabase
          .from("courses")
          .select("*")
          .eq("instructor_id", instructorId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        return data as Course[];
      } catch (error: any) {
        console.error("Error fetching instructor courses:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los cursos",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!instructorId,
  });

  return { courses, isLoading };
};
