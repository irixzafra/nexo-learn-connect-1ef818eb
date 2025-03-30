
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';

interface Module {
  id: string;
  title: string;
  course_id: string;
  module_order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  module_id: string;
  course_id: string;
  content_type: 'text' | 'video';
  content_text?: any;
  content_video_url?: string;
  lesson_order: number;
  is_previewable: boolean;
}

export function useCourseDetails(courseId?: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [modulesWithLessons, setModulesWithLessons] = useState<Module[]>([]);

  // Query course details
  const { data: courseData, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        throw error;
      }

      return data as Course;
    },
    enabled: !!courseId,
  });

  // Query modules
  const { data: modules = [], isLoading: isLoadingModules } = useQuery({
    queryKey: ['courseModules', courseId],
    queryFn: async () => {
      if (!courseId) return [];

      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('module_order', { ascending: true });

      if (error) {
        console.error('Error fetching modules:', error);
        return [];
      }

      return data as Module[];
    },
    enabled: !!courseId,
  });

  // Query lessons
  const { data: lessons = [], isLoading: isLoadingLessons } = useQuery({
    queryKey: ['courseLessons', courseId],
    queryFn: async () => {
      if (!courseId) return [];

      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('lesson_order', { ascending: true });

      if (error) {
        console.error('Error fetching lessons:', error);
        return [];
      }

      return data as Lesson[];
    },
    enabled: !!courseId,
  });

  // Combine modules and lessons
  useEffect(() => {
    if (modules.length && lessons.length) {
      const modulesWithLessonsData = modules.map(module => {
        const moduleLessons = lessons.filter(lesson => lesson.module_id === module.id);
        return {
          ...module,
          lessons: moduleLessons,
        };
      });

      setModulesWithLessons(modulesWithLessonsData);
    }
  }, [modules, lessons]);

  useEffect(() => {
    if (courseData) {
      setCourse(courseData);
    }
  }, [courseData]);

  return {
    course,
    modules,
    lessons,
    modulesWithLessons,
    isLoading: isLoadingCourse || isLoadingModules || isLoadingLessons,
  };
}
