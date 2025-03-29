
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

type LessonProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  course_id: string;
  is_completed: boolean;
  completion_date: string | null;
  last_position: number | null;
  created_at: string;
  updated_at: string;
};

type LessonProgressUpdate = {
  is_completed?: boolean;
  last_position?: number;
};

export const useLessonProgress = (
  userId?: string, 
  courseId?: string, 
  lessonId?: string
) => {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch progress for a specific lesson
  const { data: lessonProgress, isLoading: isLoadingProgress } = useQuery({
    queryKey: ["lessonProgress", userId, lessonId],
    queryFn: async () => {
      try {
        if (!userId || !lessonId) return null;

        const { data, error } = await supabase
          .from("lesson_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("lesson_id", lessonId)
          .maybeSingle();

        if (error) throw error;

        return data as LessonProgress | null;
      } catch (error: any) {
        console.error("Error fetching lesson progress:", error);
        return null;
      }
    },
    enabled: !!userId && !!lessonId,
  });

  // Fetch all progress for a course
  const { data: courseProgress, isLoading: isLoadingCourseProgress } = useQuery({
    queryKey: ["courseProgress", userId, courseId],
    queryFn: async () => {
      try {
        if (!userId || !courseId) return [];

        const { data, error } = await supabase
          .from("lesson_progress")
          .select("*")
          .eq("user_id", userId)
          .eq("course_id", courseId);

        if (error) throw error;

        return data as LessonProgress[];
      } catch (error: any) {
        console.error("Error fetching course progress:", error);
        return [];
      }
    },
    enabled: !!userId && !!courseId,
  });

  // Calculate overall course progress percentage
  const { data: courseProgressPercentage, isLoading: isLoadingPercentage } = useQuery({
    queryKey: ["courseProgressPercentage", userId, courseId],
    queryFn: async () => {
      try {
        if (!userId || !courseId) return 0;

        const { data, error } = await supabase.rpc(
          "calculate_course_progress",
          {
            course_id_param: courseId,
            user_id_param: userId,
          }
        );

        if (error) throw error;

        return data as number;
      } catch (error: any) {
        console.error("Error calculating course progress:", error);
        return 0;
      }
    },
    enabled: !!userId && !!courseId,
  });

  // Update lesson progress
  const updateProgress = async (updates: LessonProgressUpdate) => {
    try {
      if (!userId || !lessonId || !courseId) {
        throw new Error("Missing required parameters");
      }

      setIsUpdating(true);

      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from("lesson_progress")
        .select("id")
        .eq("user_id", userId)
        .eq("lesson_id", lessonId)
        .maybeSingle();

      let result;

      if (existingProgress) {
        // Update existing record
        const updateData = { ...updates };
        
        // If marking as completed, add completion date
        if (updates.is_completed) {
          updateData.completion_date = new Date().toISOString();
        }

        result = await supabase
          .from("lesson_progress")
          .update(updateData)
          .eq("id", existingProgress.id)
          .select()
          .single();
      } else {
        // Create new record
        result = await supabase
          .from("lesson_progress")
          .insert({
            user_id: userId,
            lesson_id: lessonId,
            course_id: courseId,
            ...(updates.is_completed ? { 
              is_completed: true,
              completion_date: new Date().toISOString() 
            } : { is_completed: false }),
            ...(updates.last_position !== undefined ? { last_position: updates.last_position } : {})
          })
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["lessonProgress", userId, lessonId] });
      queryClient.invalidateQueries({ queryKey: ["courseProgress", userId, courseId] });
      queryClient.invalidateQueries({ queryKey: ["courseProgressPercentage", userId, courseId] });
      
      return result.data as LessonProgress;
    } catch (error: any) {
      console.error("Error updating lesson progress:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el progreso",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  // Mark lesson as completed
  const markLessonCompleted = async () => {
    return updateProgress({ is_completed: true });
  };

  // Update last position (for video lessons)
  const updateLastPosition = async (position: number) => {
    return updateProgress({ last_position: position });
  };

  // Get total completed lessons for the course
  const completedLessonsCount = courseProgress?.filter(p => p.is_completed)?.length || 0;

  return {
    lessonProgress,
    courseProgress,
    courseProgressPercentage,
    isCompleted: lessonProgress?.is_completed || false,
    lastPosition: lessonProgress?.last_position || 0,
    completedLessonsCount,
    isLoading: isLoadingProgress || isLoadingCourseProgress || isLoadingPercentage,
    isUpdating,
    updateProgress,
    markLessonCompleted,
    updateLastPosition,
  };
};
