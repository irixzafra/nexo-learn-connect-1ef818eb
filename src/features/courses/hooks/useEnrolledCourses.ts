
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Course } from "@/types/course";

export const useEnrolledCourses = (userId?: string) => {
  const { data: enrolledCourses = [], isLoading, error } = useQuery({
    queryKey: ["enrolledCourses", userId],
    queryFn: async () => {
      try {
        if (!userId) return [];

        const { data: enrollments, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", userId);

        if (enrollmentsError) throw enrollmentsError;

        if (enrollments.length === 0) return [];

        const courseIds = enrollments.map((enrollment) => enrollment.course_id);

        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select(`
            *,
            instructor:profiles(id, full_name)
          `)
          .in("id", courseIds);

        if (coursesError) throw coursesError;

        return courses as Course[];
      } catch (error: any) {
        console.error("Error fetching enrolled courses:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los cursos matriculados",
          variant: "destructive",
        });
        return [];
      }
    },
    enabled: !!userId,
    retry: 1,
    retryDelay: 1000,
  });

  return { enrolledCourses, isLoading, error };
};
