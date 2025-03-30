
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export const useLessonCompletion = (lessonId: string, userId: string | undefined, courseId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // Query to check if the lesson is already completed
  const { data, isLoading } = useQuery({
    queryKey: ['lessonProgress', lessonId, userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('lesson_id', lessonId)
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is the "no rows returned" error
        console.error('Error fetching lesson progress:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!userId && !!lessonId,
  });

  // Mutation to mark lesson as completed
  const markAsCompletedMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !lessonId) throw new Error('User ID and Lesson ID are required');
      
      setIsUpdating(true);
      
      // Check if a record already exists
      if (data) {
        // Update existing record
        const { data: updatedData, error } = await supabase
          .from('lesson_progress')
          .update({
            is_completed: true,
            completion_date: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id)
          .select()
          .single();
        
        if (error) throw error;
        return updatedData;
      } else {
        // Create new record
        const { data: newData, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId,
            is_completed: true,
            last_position: 0,
            completion_date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (error) throw error;
        return newData;
      }
    },
    onSuccess: () => {
      toast({
        title: "Progreso guardado",
        description: "La lección ha sido marcada como completada.",
      });
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', lessonId, userId] });
      queryClient.invalidateQueries({ queryKey: ['courseProgress', courseId, userId] });
    },
    onError: (error) => {
      console.error('Error updating lesson progress:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar el progreso. Inténtalo de nuevo.",
      });
    },
    onSettled: () => {
      setIsUpdating(false);
    }
  });

  const markAsCompleted = () => {
    markAsCompletedMutation.mutate();
  };

  return {
    isCompleted: data?.is_completed || false,
    isLoading,
    isUpdating,
    markAsCompleted
  };
};
