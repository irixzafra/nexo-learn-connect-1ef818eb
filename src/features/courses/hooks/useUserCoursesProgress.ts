
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useUserCoursesProgress = (userId?: string, courseIds?: string[]) => {
  const { data: coursesProgress = {}, isLoading } = useQuery({
    queryKey: ["userCoursesProgress", userId, courseIds],
    queryFn: async () => {
      try {
        if (!userId || !courseIds || courseIds.length === 0) return {};

        // Create a map to store progress for each course
        const progressMap: Record<string, number> = {};

        // Calculate progress for each course
        await Promise.all(
          courseIds.map(async (courseId) => {
            const { data, error } = await supabase.rpc(
              "calculate_course_progress",
              {
                course_id_param: courseId,
                user_id_param: userId,
              }
            );

            if (error) {
              console.error(`Error calculating progress for course ${courseId}:`, error);
              return;
            }

            progressMap[courseId] = data as number;
          })
        );

        return progressMap;
      } catch (error: any) {
        console.error("Error fetching user courses progress:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el progreso de los cursos",
          variant: "destructive",
        });
        return {};
      }
    },
    enabled: !!userId && !!courseIds && courseIds.length > 0,
  });

  return { coursesProgress, isLoading };
};
