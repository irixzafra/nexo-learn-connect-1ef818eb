
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  last_position: number;
  completion_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useLessonProgress(userId?: string, courseId?: string, lessonId?: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [courseProgressPercentage, setCourseProgressPercentage] = useState<number | null>(null);
  const [completedLessonsCount, setCompletedLessonsCount] = useState(0);

  // Query course progress for the user
  const { data: courseProgress, isLoading: isLoadingCourseProgress } = useQuery({
    queryKey: ['courseProgress', userId, courseId],
    queryFn: async () => {
      if (!userId || !courseId) return [];

      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId);

      if (error) {
        console.error('Error fetching course progress:', error);
        return [];
      }

      return data as LessonProgress[];
    },
    enabled: !!userId && !!courseId,
  });

  // Query total lesson count for the course
  const { data: lessonCount, isLoading: isLoadingLessonCount } = useQuery({
    queryKey: ['lessonCount', courseId],
    queryFn: async () => {
      if (!courseId) return 0;

      const { count, error } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId);

      if (error) {
        console.error('Error fetching lesson count:', error);
        return 0;
      }

      return count || 0;
    },
    enabled: !!courseId,
  });

  // Query specific lesson progress if lessonId is provided
  const { data: lessonProgress, isLoading: isLoadingLessonProgress } = useQuery({
    queryKey: ['lessonProgress', userId, lessonId],
    queryFn: async () => {
      if (!userId || !lessonId) return null;

      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching lesson progress:', error);
        return null;
      }

      return data as LessonProgress | null;
    },
    enabled: !!userId && !!lessonId,
  });

  // Mutation to mark lesson as completed
  const markCompletedMutation = useMutation({
    mutationFn: async () => {
      if (!userId || !courseId || !lessonId) {
        throw new Error('Missing required parameters');
      }

      const now = new Date().toISOString();

      if (lessonProgress) {
        // Update existing progress
        const { data, error } = await supabase
          .from('lesson_progress')
          .update({
            is_completed: true,
            completion_date: now,
            updated_at: now,
          })
          .eq('id', lessonProgress.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new progress
        const { data, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId,
            is_completed: true,
            last_position: 0,
            completion_date: now,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonProgress', userId, lessonId] });
      queryClient.invalidateQueries({ queryKey: ['courseProgress', userId, courseId] });
      
      toast({
        title: "Lección completada",
        description: "¡Buen trabajo! Tu progreso ha sido guardado.",
      });
      
      setIsCompleted(true);
    },
    onError: (error) => {
      console.error('Error marking lesson as completed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo marcar la lección como completada.",
      });
    },
  });

  // Update lesson position
  const updatePositionMutation = useMutation({
    mutationFn: async (position: number) => {
      if (!userId || !courseId || !lessonId) {
        throw new Error('Missing required parameters');
      }

      const now = new Date().toISOString();

      if (lessonProgress) {
        // Update existing progress
        const { data, error } = await supabase
          .from('lesson_progress')
          .update({
            last_position: position,
            updated_at: now,
          })
          .eq('id', lessonProgress.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new progress
        const { data, error } = await supabase
          .from('lesson_progress')
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId,
            is_completed: false,
            last_position: position,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
  });

  // Calculate course progress percentage
  useEffect(() => {
    if (courseProgress && lessonCount && lessonCount > 0) {
      const completedCount = courseProgress.filter(p => p.is_completed).length;
      setCompletedLessonsCount(completedCount);
      const percentage = Math.round((completedCount / lessonCount) * 100);
      setCourseProgressPercentage(percentage);
    } else {
      setCourseProgressPercentage(0);
      setCompletedLessonsCount(0);
    }
  }, [courseProgress, lessonCount]);

  // Set isCompleted based on lessonProgress
  useEffect(() => {
    if (lessonProgress) {
      setIsCompleted(lessonProgress.is_completed);
    } else {
      setIsCompleted(false);
    }
  }, [lessonProgress]);

  const markLessonCompleted = async () => {
    setIsUpdating(true);
    try {
      await markCompletedMutation.mutateAsync();
    } finally {
      setIsUpdating(false);
    }
  };

  const updatePosition = async (position: number) => {
    try {
      await updatePositionMutation.mutateAsync(position);
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  return {
    isCompleted,
    isUpdating,
    lessonProgress,
    courseProgress,
    courseProgressPercentage,
    completedLessonsCount,
    isLoading: isLoadingLessonProgress || isLoadingCourseProgress || isLoadingLessonCount,
    markLessonCompleted,
    updatePosition,
  };
}
