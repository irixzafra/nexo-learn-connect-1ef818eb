
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface EnrolledStudent {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
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
        
        // Consulta simplificada - solo obtenemos datos de enrollments sin join
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            user_id
          `) // Sin join a profiles
          .eq('course_id', courseId);

        if (error) throw error;
        
        if (!data || data.length === 0) return [];

        // Transformamos los datos, dejando full_name y email como null temporalmente
        return data.map((enrollment: any) => ({
          id: enrollment.id,
          user_id: enrollment.user_id,
          full_name: null, // Temporalmente null para diagnóstico
          email: null, // Temporalmente null para diagnóstico
          enrolled_at: enrollment.enrolled_at
        }));
      } catch (error: any) {
        console.error("Error fetching enrolled students:", error);
        throw error;
      }
    },
    enabled: !!courseId,
    retry: 1,
  });

  return { enrolledStudents, isLoading, error, refetch };
};
