
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Course } from "@/types/course";

export const useEnrolledCourses = (userId?: string) => {
  const { data: enrolledCourses = [], isLoading, error, refetch } = useQuery({
    queryKey: ["enrolledCourses", userId],
    queryFn: async () => {
      try {
        if (!userId) return [];

        // First get enrollment IDs
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", userId);

        if (enrollmentsError) throw enrollmentsError;

        if (enrollments.length === 0) return [];

        const courseIds = enrollments.map((enrollment) => enrollment.course_id);

        // Then fetch course details with optimized query to avoid RLS recursion
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select(`
            id, title, description, price, currency, instructor_id, created_at, updated_at, is_published, 
            cover_image_url, level, duration_text, 
            instructor:profiles(id, full_name)
          `)
          .in("id", courseIds);

        if (coursesError) throw coursesError;

        return courses as Course[];
      } catch (error: any) {
        console.error("Error fetching enrolled courses:", error);
        toast.error("No se pudieron cargar los cursos matriculados. Por favor, inténtelo de nuevo más tarde.");
        return [];
      }
    },
    enabled: !!userId,
    retry: 1,
    retryDelay: 1000,
  });

  return { enrolledCourses, isLoading, error, refetch };
};
