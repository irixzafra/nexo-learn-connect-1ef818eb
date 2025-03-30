
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

/**
 * Hook to fetch public course data by ID
 * @param courseId - The UUID of the course to fetch
 * @returns Object containing course data, loading state, and error
 */
export const useCoursePublicData = (courseId: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coursePublicData', courseId],
    queryFn: async () => {
      if (!courseId) {
        throw new Error('Course ID is required');
      }

      const { data, error } = await supabase
        .from('courses')
        .select('*, profiles(full_name)')
        .eq('id', courseId)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching course data:', error);
        throw error;
      }

      return data as Course;
    },
    enabled: !!courseId,
  });

  return {
    course: data || null,
    isLoading,
    error,
  };
};
