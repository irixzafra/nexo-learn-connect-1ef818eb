
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types/course";
import { toast } from "@/components/ui/use-toast";

export const useEnrolledCourses = (userId: string | undefined) => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Get courses the user is enrolled in
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', userId);
        
        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError);
          throw new Error('No se pudieron cargar tus cursos. Por favor, inténtalo de nuevo.');
        }
        
        if (!enrollments || enrollments.length === 0) {
          setEnrolledCourses([]);
          setIsLoading(false);
          return;
        }
        
        const courseIds = enrollments.map(enrollment => enrollment.course_id);
        
        // Get course details
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select(`
            id, 
            title, 
            description, 
            cover_image_url,
            duration_text,
            level,
            instructor_id,
            price,
            currency,
            is_published,
            created_at,
            updated_at,
            profiles:instructor_id (
              id, full_name
            )
          `)
          .in('id', courseIds);
        
        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          throw new Error('No se pudieron cargar los detalles de tus cursos.');
        }
        
        // Format course data to match Course type
        const formattedCourses = coursesData.map(course => {
          let instructorData;
          
          // Handle instructor data properly
          if (course.profiles) {
            // Check if profiles is an object with expected properties
            if (typeof course.profiles === 'object' && 
                'id' in course.profiles && 
                'full_name' in course.profiles) {
              instructorData = {
                id: course.profiles.id,
                full_name: course.profiles.full_name
              };
            }
          }
          
          return {
            ...course,
            instructor: instructorData
          } as Course;
        });
        
        setEnrolledCourses(formattedCourses);
      } catch (error) {
        console.error('Error in fetchEnrolledCourses:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Ocurrió un error al cargar tus cursos.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [userId]);

  return { enrolledCourses, isLoading, error };
};
