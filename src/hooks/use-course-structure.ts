
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Module, Lesson } from '@/types/course';
import { toast } from 'sonner';

// Fetch modules for a course
export const useCourseModules = (courseId: string) => {
  return useQuery({
    queryKey: ['courseModules', courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('module_order', { ascending: true });

      if (error) {
        console.error('Error fetching modules:', error);
        throw error;
      }

      return data as Module[];
    },
    enabled: !!courseId,
  });
};

// Fetch lessons for a module
export const useModuleLessons = (moduleId: string) => {
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
};

// Create a new module
export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, title }: { courseId: string; title: string }) => {
      // Get the highest module_order for this course
      const { data: modules, error: fetchError } = await supabase
        .from('modules')
        .select('module_order')
        .eq('course_id', courseId)
        .order('module_order', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Error fetching modules order:', fetchError);
        throw fetchError;
      }

      const nextOrder = modules && modules.length > 0 ? modules[0].module_order + 1 : 0;

      const { data, error } = await supabase
        .from('modules')
        .insert([
          {
            course_id: courseId,
            title,
            module_order: nextOrder,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating module:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      toast.success('Módulo creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['courseModules', variables.courseId] });
    },
    onError: (error) => {
      console.error('Error al crear módulo:', error);
      toast.error('Error al crear el módulo');
    },
  });
};

// Update a module
export const useUpdateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ moduleId, title }: { moduleId: string; title: string }) => {
      const { data, error } = await supabase
        .from('modules')
        .update({ title })
        .eq('id', moduleId)
        .select()
        .single();

      if (error) {
        console.error('Error updating module:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success('Módulo actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.course_id] });
    },
    onError: (error) => {
      console.error('Error al actualizar módulo:', error);
      toast.error('Error al actualizar el módulo');
    },
  });
};

// Delete a module
export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ moduleId, courseId }: { moduleId: string; courseId: string }) => {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);

      if (error) {
        console.error('Error deleting module:', error);
        throw error;
      }

      return { moduleId, courseId };
    },
    onSuccess: (data) => {
      toast.success('Módulo eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.courseId] });
    },
    onError: (error) => {
      console.error('Error al eliminar módulo:', error);
      toast.error('Error al eliminar el módulo');
    },
  });
};

// Create a new lesson
export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      moduleId, 
      courseId, 
      title 
    }: { 
      moduleId: string; 
      courseId: string; 
      title: string 
    }) => {
      // Get the highest lesson_order for this module
      const { data: lessons, error: fetchError } = await supabase
        .from('lessons')
        .select('lesson_order')
        .eq('module_id', moduleId)
        .order('lesson_order', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error('Error fetching lessons order:', fetchError);
        throw fetchError;
      }

      const nextOrder = lessons && lessons.length > 0 ? lessons[0].lesson_order + 1 : 0;

      const { data, error } = await supabase
        .from('lessons')
        .insert([
          {
            module_id: moduleId,
            course_id: courseId,
            title,
            lesson_order: nextOrder,
            content_type: 'text',
            is_previewable: false,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating lesson:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (_data, variables) => {
      toast.success('Lección creada correctamente');
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', variables.moduleId] });
    },
    onError: (error) => {
      console.error('Error al crear lección:', error);
      toast.error('Error al crear la lección');
    },
  });
};

// Update a lesson
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      lessonId, 
      title,
      isPreviewable 
    }: { 
      lessonId: string; 
      title?: string;
      isPreviewable?: boolean;
    }) => {
      const updates: { title?: string; is_previewable?: boolean } = {};
      
      if (title !== undefined) updates.title = title;
      if (isPreviewable !== undefined) updates.is_previewable = isPreviewable;
      
      const { data, error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', lessonId)
        .select()
        .single();

      if (error) {
        console.error('Error updating lesson:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success('Lección actualizada correctamente');
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.module_id] });
    },
    onError: (error) => {
      console.error('Error al actualizar lección:', error);
      toast.error('Error al actualizar la lección');
    },
  });
};

// Delete a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lessonId, moduleId }: { lessonId: string; moduleId: string }) => {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);

      if (error) {
        console.error('Error deleting lesson:', error);
        throw error;
      }

      return { lessonId, moduleId };
    },
    onSuccess: (data) => {
      toast.success('Lección eliminada correctamente');
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.moduleId] });
    },
    onError: (error) => {
      console.error('Error al eliminar lección:', error);
      toast.error('Error al eliminar la lección');
    },
  });
};

// Update the order of modules
export const useUpdateModulesOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ modules, courseId }: { modules: Module[]; courseId: string }) => {
      const updates = modules.map((module, index) => ({
        id: module.id,
        module_order: index,
      }));

      const { error } = await supabase.from('modules').upsert(updates);

      if (error) {
        console.error('Error updating modules order:', error);
        throw error;
      }

      return { courseId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.courseId] });
    },
    onError: (error) => {
      console.error('Error al actualizar el orden de los módulos:', error);
      toast.error('Error al reordenar los módulos');
    },
  });
};

// Update the order of lessons
export const useUpdateLessonsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lessons, moduleId }: { lessons: Lesson[]; moduleId: string }) => {
      const updates = lessons.map((lesson, index) => ({
        id: lesson.id,
        lesson_order: index,
      }));

      const { error } = await supabase.from('lessons').upsert(updates);

      if (error) {
        console.error('Error updating lessons order:', error);
        throw error;
      }

      return { moduleId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.moduleId] });
    },
    onError: (error) => {
      console.error('Error al actualizar el orden de las lecciones:', error);
      toast.error('Error al reordenar las lecciones');
    },
  });
};
