
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

/**
 * Hook to fetch public course data by ID
 * @param courseId - The ID of the course to fetch (UUID or numeric)
 * @returns Object containing course data, loading state, and error
 */
export const useCoursePublicData = (courseId: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coursePublicData', courseId],
    queryFn: async () => {
      if (!courseId) {
        throw new Error('Course ID is required');
      }

      // Check if we're dealing with a numeric ID or UUID
      const isNumeric = /^\d+$/.test(courseId);
      
      let query = supabase
        .from('courses')
        .select('*, profiles(full_name)')
        .eq('is_published', true);
      
      // Use the appropriate column based on ID type
      if (isNumeric) {
        // If it's a numeric ID, convert it to number for comparison
        query = query.eq('id', parseInt(courseId, 10));
      } else {
        // If it's a UUID, use it directly
        query = query.eq('id', courseId);
      }
      
      const { data, error } = await query.single();

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

/**
 * Hook to fetch public course data by slug
 * @param slug - The slug of the course to fetch
 * @returns Object containing course data, loading state, and error
 */
export const useCoursePublicDataBySlug = (slug: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coursePublicDataBySlug', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Course slug is required');
      }

      const { data, error } = await supabase
        .from('courses')
        .select('*, profiles(full_name)')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) {
        console.error('Error fetching course data by slug:', error);
        throw error;
      }

      return data as Course;
    },
    enabled: !!slug,
  });

  return {
    course: data || null,
    isLoading,
    error,
  };
};
