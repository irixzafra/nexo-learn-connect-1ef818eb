
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Lesson } from '@/types/course';

export const useAdjacentLessons = (currentLessonId: string, moduleId: string) => {
  return useQuery({
    queryKey: ['adjacentLessons', currentLessonId, moduleId],
    queryFn: async () => {
      // Fetch all lessons in the module to determine order
      const { data: moduleLessons, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('lesson_order', { ascending: true });
      
      if (error) {
        console.error('Error fetching module lessons:', error);
        throw error;
      }
      
      // Find the current lesson's index
      const currentLessonIndex = moduleLessons.findIndex(
        (lesson) => lesson.id === currentLessonId
      );
      
      if (currentLessonIndex === -1) {
        return { prevLesson: null, nextLesson: null };
      }
      
      // Determine previous and next lessons
      const prevLesson = currentLessonIndex > 0 
        ? moduleLessons[currentLessonIndex - 1] 
        : null;
        
      const nextLesson = currentLessonIndex < moduleLessons.length - 1 
        ? moduleLessons[currentLessonIndex + 1] 
        : null;
      
      return { 
        prevLesson: prevLesson as Lesson | null, 
        nextLesson: nextLesson as Lesson | null 
      };
    },
    enabled: !!currentLessonId && !!moduleId,
  });
};
