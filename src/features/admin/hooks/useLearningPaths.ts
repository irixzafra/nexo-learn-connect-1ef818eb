
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/types/courses';

export interface LearningPath {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  courses?: Course[];
}

export interface LearningPathCourse {
  id: string;
  learning_path_id: string;
  course_id: string;
  order: number;
  course?: Course;
}

export function useLearningPaths() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: learningPaths, isLoading, error } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select('*')
        .order('title');
      
      if (error) throw new Error(error.message);
      return data as LearningPath[];
    }
  });

  const getLearningPathWithCourses = async (pathId: string) => {
    // First, get the learning path
    const { data: path, error: pathError } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('id', pathId)
      .single();
    
    if (pathError) throw new Error(pathError.message);
    
    // Then, get the courses associated with this path
    const { data: pathCourses, error: coursesError } = await supabase
      .from('learning_path_courses')
      .select('*, course:courses(*)')
      .eq('learning_path_id', pathId)
      .order('order');
    
    if (coursesError) throw new Error(coursesError.message);
    
    // Combine both data sets
    const pathWithCourses = {
      ...path,
      courses: pathCourses.map(pc => pc.course)
    };
    
    return pathWithCourses as LearningPath;
  };

  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');
      
      if (error) throw new Error(error.message);
      return data as Course[];
    }
  });

  const createLearningPath = useMutation({
    mutationFn: async (newLearningPath: Omit<LearningPath, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('learning_paths')
        .insert(newLearningPath)
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
      toast({
        title: "Ruta de aprendizaje creada",
        description: "La ruta de aprendizaje ha sido creada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al crear la ruta de aprendizaje: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const updateLearningPath = useMutation({
    mutationFn: async (learningPath: Partial<LearningPath> & { id: string }) => {
      const { data, error } = await supabase
        .from('learning_paths')
        .update(learningPath)
        .eq('id', learningPath.id)
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
      toast({
        title: "Ruta de aprendizaje actualizada",
        description: "La ruta de aprendizaje ha sido actualizada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar la ruta de aprendizaje: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const deleteLearningPath = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', id);
      
      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
      toast({
        title: "Ruta de aprendizaje eliminada",
        description: "La ruta de aprendizaje ha sido eliminada exitosamente"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar la ruta de aprendizaje: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const addCourseToLearningPath = useMutation({
    mutationFn: async ({ 
      learningPathId, 
      courseId, 
      order 
    }: { 
      learningPathId: string; 
      courseId: string; 
      order: number 
    }) => {
      const { data, error } = await supabase
        .from('learning_path_courses')
        .insert({
          learning_path_id: learningPathId,
          course_id: courseId,
          order
        })
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['learningPath', variables.learningPathId] });
      toast({
        title: "Curso añadido",
        description: "El curso ha sido añadido a la ruta de aprendizaje"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al añadir el curso: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const removeCourseFromLearningPath = useMutation({
    mutationFn: async ({ 
      learningPathId, 
      courseId 
    }: { 
      learningPathId: string; 
      courseId: string; 
    }) => {
      const { error } = await supabase
        .from('learning_path_courses')
        .delete()
        .eq('learning_path_id', learningPathId)
        .eq('course_id', courseId);
      
      if (error) throw new Error(error.message);
      return { learningPathId, courseId };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['learningPath', variables.learningPathId] });
      toast({
        title: "Curso eliminado",
        description: "El curso ha sido eliminado de la ruta de aprendizaje"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al eliminar el curso: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const updateCoursesOrder = useMutation({
    mutationFn: async ({ 
      learningPathId, 
      orderedCourses 
    }: { 
      learningPathId: string; 
      orderedCourses: { course_id: string; order: number }[] 
    }) => {
      // Update each course order sequentially
      for (const course of orderedCourses) {
        const { error } = await supabase
          .from('learning_path_courses')
          .update({ order: course.order })
          .eq('learning_path_id', learningPathId)
          .eq('course_id', course.course_id);
        
        if (error) throw new Error(error.message);
      }
      
      return { learningPathId, orderedCourses };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['learningPath', variables.learningPathId] });
      toast({
        title: "Orden actualizado",
        description: "El orden de los cursos ha sido actualizado"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar el orden: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const filteredLearningPaths = learningPaths?.filter(path => 
    path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (path.description && path.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return {
    learningPaths,
    filteredLearningPaths,
    courses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    getLearningPathWithCourses,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
    addCourseToLearningPath,
    removeCourseFromLearningPath,
    updateCoursesOrder
  };
}
