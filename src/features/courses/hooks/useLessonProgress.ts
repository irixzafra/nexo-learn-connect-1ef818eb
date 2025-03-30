
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useLessonProgress = (
  userId: string | undefined, 
  courseId?: string, 
  lessonId?: string
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { 
    data: courseProgress,
    isLoading,
    error
  } = useQuery({
    queryKey: ['lessonProgress', userId, courseId],
    queryFn: async () => {
      if (!userId || !courseId) return [];
      
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId);
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId && !!courseId,
  });
  
  // Calculate total completed lessons and percentage
  const completedLessonsCount = courseProgress?.filter(p => p.is_completed)?.length || 0;
  
  // Get total lessons by course ID
  const { data: totalLessons } = useQuery({
    queryKey: ['totalLessons', courseId],
    queryFn: async () => {
      if (!courseId) return 0;
      
      const { count, error } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!courseId,
  });
  
  // Calculate percentage
  const courseProgressPercentage = totalLessons && totalLessons > 0 
    ? Math.round((completedLessonsCount / totalLessons) * 100) 
    : 0;
  
  // Check if current lesson is completed
  const isCompleted = lessonId 
    ? courseProgress?.some(p => p.lesson_id === lessonId && p.is_completed) 
    : false;
  
  // Mutation to mark a lesson as completed
  const markLessonCompletedMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !courseId || !lessonId) {
        throw new Error('Missing required IDs');
      }
      
      // Check if record exists
      const { data: existingProgress, error: checkError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      if (existingProgress) {
        // Update existing record
        const { error } = await supabase
          .from('lesson_progress')
          .update({ 
            is_completed: true,
            completion_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('lesson_progress')
          .insert({ 
            user_id: userId,
            course_id: courseId,
            lesson_id: lessonId,
            is_completed: true,
            completion_date: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', userId, courseId] });
      toast({
        title: "Progreso guardado",
        description: "La lección ha sido marcada como completada.",
      });
    },
    onError: (error) => {
      console.error("Error updating lesson progress:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el progreso de la lección.",
      });
    },
  });
  
  const markLessonCompleted = async () => {
    return await markLessonCompletedMutation.mutateAsync();
  };
  
  return {
    courseProgress,
    isLoading,
    error,
    completedLessonsCount,
    totalLessons,
    courseProgressPercentage,
    isCompleted,
    isUpdating: markLessonCompletedMutation.isPending,
    markLessonCompleted
  };
};
