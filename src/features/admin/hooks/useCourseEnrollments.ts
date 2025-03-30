
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
        
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            user_id,
            profiles:user_id (
              id, 
              full_name,
              email
            )
          `)
          .eq('course_id', courseId);

        if (error) throw error;
        
        if (!data || data.length === 0) return [];

        // Transform the data to flatten the structure
        return data.map((enrollment: any) => {
          // Access the profile data - it's returned as an object, not an array
          const profile = enrollment.profiles || {};
          
          return {
            id: enrollment.id,
            user_id: enrollment.user_id,
            full_name: profile.full_name || null,
            email: profile.email || null,
            enrolled_at: enrollment.enrolled_at
          };
        });
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
