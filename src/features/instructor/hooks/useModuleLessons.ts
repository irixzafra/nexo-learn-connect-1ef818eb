
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Lesson } from '@/types/course';

export function useModuleLessons(moduleId: string) {
  return useQuery({
    queryKey: ['moduleLessons', moduleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('lesson_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }
      
      return data as Lesson[];
    },
    enabled: !!moduleId,
  });
}
