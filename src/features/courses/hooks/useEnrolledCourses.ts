
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

        console.log("Fetching enrolled courses for user:", userId);

        // First get enrollment IDs
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", userId);

        if (enrollmentsError) {
          console.error("Error fetching enrollments:", enrollmentsError);
          throw enrollmentsError;
        }

        console.log("Found enrollments:", enrollments?.length || 0);

        if (enrollments.length === 0) return [];

        const courseIds = enrollments.map((enrollment) => enrollment.course_id);

        // Then fetch course details
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select(`
            id, title, description, price, currency, instructor_id, created_at, updated_at, is_published, 
            cover_image_url, level, duration_text, 
            instructor:profiles(id, full_name)
          `)
          .in("id", courseIds);

        if (coursesError) {
          console.error("Error fetching courses:", coursesError);
          throw coursesError;
        }

        console.log("Retrieved enrolled courses:", courses?.length || 0);

        // Process the response to match the Course type
        return courses.map(course => {
          // Handle the instructor object properly
          const instructorArray = course.instructor as unknown as Array<{id: string, full_name: string}>;
          
          return {
            ...course,
            // Normalize currency field to match the Course type
            currency: (course.currency?.toLowerCase() === 'usd' ? 'usd' : 'eur') as 'eur' | 'usd',
            instructor: instructorArray && instructorArray.length > 0 
              ? { id: instructorArray[0].id, full_name: instructorArray[0].full_name }
              : undefined
          } as Course;
        });
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
