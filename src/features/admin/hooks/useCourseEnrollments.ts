
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface EnrolledStudent {
  id: string;
  user_id: string;
  full_name: string | null;
  enrolled_at: string;
}

export const useCourseEnrollments = (courseId: string) => {
  const { 
    data: enrolledStudents = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["courseEnrollments", courseId],
    queryFn: async () => {
      try {
        if (!courseId) {
          throw new Error("ID del curso no proporcionado");
        }
        
        // Use the updated RPC function (without email field)
        const { data, error } = await supabase
          .rpc('get_course_enrollments_with_details', { course_id_param: courseId });

        if (error) throw error;
        
        if (!data || data.length === 0) return [];

        // Transform the data to match our existing interface
        return data.map((enrollment: any) => ({
          id: enrollment.enrollment_id,
          user_id: enrollment.user_id,
          full_name: enrollment.full_name || `Usuario ${enrollment.user_id.substring(0, 8)}`,
          enrolled_at: enrollment.enrolled_at
        }));
      } catch (error: any) {
        console.error("Error fetching enrolled students:", error);
        toast.error("Error al cargar estudiantes: " + error.message);
        throw error;
      }
    },
    enabled: !!courseId,
    retry: 1,
  });

  return { enrolledStudents, isLoading, error, refetch };
};
