
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
        
        // Using a more explicit join approach instead of the foreign key relationship shorthand
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            user_id,
            enrolled_at,
            profiles!inner (
              id, 
              full_name,
              email
            )
          `)
          .eq('course_id', courseId);

        if (error) throw error;
        
        if (!data || data.length === 0) return [];

        // Transform the data to flatten the structure
        return data.map((enrollment: any) => ({
          id: enrollment.id,
          user_id: enrollment.user_id,
          full_name: enrollment.profiles?.full_name || null,
          email: enrollment.profiles?.email || null,
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
