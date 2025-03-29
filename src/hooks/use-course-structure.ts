
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Create a new module
export const useCreateModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      courseId, 
      title 
    }: { 
      courseId: string; 
      title: string 
    }) => {
      const { data, error } = await supabase
        .from('modules')
        .insert({
          course_id: courseId,
          title,
          module_order: 0 // Will be updated by the backend trigger
        })
        .select('*')
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courseModules', variables.courseId] });
      toast.success('Módulo creado correctamente');
    },
    onError: (error) => {
      console.error('Error creating module:', error);
      toast.error('Error al crear el módulo');
    }
  });
};

// Update a module
export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      moduleId, 
      title 
    }: { 
      moduleId: string; 
      title: string 
    }) => {
      const { data, error } = await supabase
        .from('modules')
        .update({ title })
        .eq('id', moduleId)
        .select('*')
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.course_id] });
      toast.success('Módulo actualizado correctamente');
    },
    onError: (error) => {
      console.error('Error updating module:', error);
      toast.error('Error al actualizar el módulo');
    }
  });
};

// Delete a module
export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      moduleId, 
      courseId 
    }: { 
      moduleId: string; 
      courseId: string 
    }) => {
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', moduleId);
        
      if (error) throw error;
      return { moduleId, courseId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.courseId] });
      toast.success('Módulo eliminado correctamente');
    },
    onError: (error) => {
      console.error('Error deleting module:', error);
      toast.error('Error al eliminar el módulo');
    }
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
      const { data, error } = await supabase
        .from('lessons')
        .insert({
          module_id: moduleId,
          course_id: courseId,
          title,
          content_type: 'text',
          lesson_order: 0, // Will be updated by the backend trigger
          is_previewable: false
        })
        .select('*')
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.module_id] });
      toast.success('Lección creada correctamente');
    },
    onError: (error) => {
      console.error('Error creating lesson:', error);
      toast.error('Error al crear la lección');
    }
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
      // Construir el objeto de actualización basado en los parámetros proporcionados
      const updates: { title?: string; is_previewable?: boolean } = {};
      
      if (title !== undefined) {
        updates.title = title;
      }
      
      if (isPreviewable !== undefined) {
        updates.is_previewable = isPreviewable;
      }
      
      const { data, error } = await supabase
        .from('lessons')
        .update(updates)
        .eq('id', lessonId)
        .select('*')
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.module_id] });
      queryClient.invalidateQueries({ queryKey: ['lesson', data.id] });
      queryClient.invalidateQueries({ queryKey: ['course', data.course_id] });
      queryClient.invalidateQueries({ queryKey: ['courseLessons', data.course_id] });
    },
    onError: (error) => {
      console.error('Error updating lesson:', error);
      toast.error('Error al actualizar la lección');
    }
  });
};

// Delete a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      lessonId, 
      moduleId 
    }: { 
      lessonId: string; 
      moduleId: string 
    }) => {
      const { error } = await supabase
        .from('lessons')
        .delete()
        .eq('id', lessonId);
        
      if (error) throw error;
      return { lessonId, moduleId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.moduleId] });
      toast.success('Lección eliminada correctamente');
    },
    onError: (error) => {
      console.error('Error deleting lesson:', error);
      toast.error('Error al eliminar la lección');
    }
  });
};

// Update modules order
export const useUpdateModulesOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      courseId, 
      modules 
    }: { 
      courseId: string; 
      modules: Array<{ id: string; order: number }> 
    }) => {
      // Preparar los datos para la actualización
      const updates = modules.map(module => ({
        id: module.id,
        module_order: module.order
      }));
      
      const { error } = await supabase
        .from('modules')
        .upsert(updates);
        
      if (error) throw error;
      return { courseId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['courseModules', data.courseId] });
      toast.success('Orden de módulos actualizado');
    },
    onError: (error) => {
      console.error('Error updating modules order:', error);
      toast.error('Error al actualizar el orden de los módulos');
    }
  });
};

// Update lessons order
export const useUpdateLessonsOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      moduleId, 
      lessons 
    }: { 
      moduleId: string; 
      lessons: Array<{ id: string; order: number }> 
    }) => {
      // Preparar los datos para la actualización
      const updates = lessons.map(lesson => ({
        id: lesson.id,
        lesson_order: lesson.order
      }));
      
      const { error } = await supabase
        .from('lessons')
        .upsert(updates);
        
      if (error) throw error;
      return { moduleId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['moduleLessons', data.moduleId] });
      toast.success('Orden de lecciones actualizado');
    },
    onError: (error) => {
      console.error('Error updating lessons order:', error);
      toast.error('Error al actualizar el orden de las lecciones');
    }
  });
};
