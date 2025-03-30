
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

export const useEnrolledCourses = (userId: string | undefined) => {
  const {
    data: enrolledCourses,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['enrolledCourses', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      // First, get the enrollment records for this user
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', userId);
        
      if (enrollmentsError) throw enrollmentsError;
      
      if (!enrollments || enrollments.length === 0) {
        return [];
      }
      
      // Extract the course IDs from the enrollments
      const courseIds = enrollments.map(enrollment => enrollment.course_id);
      
      // Now fetch the details of these courses
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!courses_instructor_id_fkey(id, full_name)
        `)
        .in('id', courseIds);
        
      if (coursesError) throw coursesError;
      
      return courses as Course[];
    },
    enabled: !!userId,
  });

  return {
    enrolledCourses,
    isLoading,
    error,
    refetch
  };
};
