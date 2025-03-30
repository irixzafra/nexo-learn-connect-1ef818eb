
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

interface UseCoursesOptions {
  instructorId?: string;
  isPublished?: boolean;
  searchQuery?: string;
  categoryId?: string;
  limit?: number;
}

export function useCourses({
  instructorId,
  isPublished,
  searchQuery,
  categoryId,
  limit,
}: UseCoursesOptions = {}) {
  return useQuery({
    queryKey: ['courses', { instructorId, isPublished, searchQuery, categoryId, limit }],
    queryFn: async () => {
      let query = supabase.from('courses').select('*');
      
      if (instructorId) {
        query = query.eq('instructor_id', instructorId);
      }
      
      if (isPublished !== undefined) {
        query = query.eq('is_published', isPublished);
      }
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw error;
      }
      
      return data as Course[];
    },
  });
}

export default useCourses;
