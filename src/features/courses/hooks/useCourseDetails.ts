
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Course, Module, Lesson } from "@/types/course";

export const useCourseDetails = (courseId?: string, slug?: string) => {
  const { data: course, isLoading: isLoadingCourse, error: courseError } = useQuery({
    queryKey: ["course", courseId, slug],
    queryFn: async () => {
      try {
        if (!courseId && !slug) return null;

        let query = supabase
          .from("courses")
          .select(`
            *,
            instructor:profiles(id, full_name)
          `);

        if (courseId) {
          query = query.eq("id", courseId);
        } else if (slug) {
          query = query.eq("slug", slug);
        }

        const { data, error } = await query.single();

        if (error) throw error;

        return data as Course;
      } catch (error: any) {
        console.error("Error fetching course:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar el curso",
          variant: "destructive",
        });
        return null;
      }
    },
    enabled: !!courseId || !!slug,
    retry: 1,
    retryDelay: 1000,
  });

  const { data: modules = [], isLoading: isLoadingModules, error: modulesError } = useQuery({
    queryKey: ["courseModules", course?.id],
    queryFn: async () => {
      try {
        if (!course?.id) return [];

        const { data, error } = await supabase
          .from("modules")
          .select("*")
          .eq("course_id", course.id)
          .order("module_order", { ascending: true });

        if (error) throw error;

        return data as Module[];
      } catch (error: any) {
        console.error("Error fetching modules:", error);
        return [];
      }
    },
    enabled: !!course?.id,
    retry: 1,
    retryDelay: 1000,
  });

  const { data: lessons = [], isLoading: isLoadingLessons, error: lessonsError } = useQuery({
    queryKey: ["courseLessons", course?.id],
    queryFn: async () => {
      try {
        if (!course?.id) return [];

        const { data, error } = await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", course.id)
          .order("lesson_order", { ascending: true });

        if (error) throw error;

        return data as Lesson[];
      } catch (error: any) {
        console.error("Error fetching lessons:", error);
        return [];
      }
    },
    enabled: !!course?.id,
    retry: 1,
    retryDelay: 1000,
  });

  const groupLessonsByModule = () => {
    return modules.map((module) => ({
      ...module,
      lessons: lessons.filter((lesson) => lesson.module_id === module.id),
    }));
  };

  const modulesWithLessons = modules.length > 0 && lessons.length > 0 
    ? groupLessonsByModule() 
    : [];

  const isLoading = isLoadingCourse || isLoadingModules || isLoadingLessons;
  const error = courseError || modulesError || lessonsError;

  return { 
    course, 
    modules, 
    lessons, 
    modulesWithLessons,
    isLoading,
    error
  };
};
