
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { LearningPath } from '@/types/course';

export function useLearningPaths() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch learning paths
  const { data: learningPaths = [], isLoading, error } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_paths')
        .select(`
          *,
          courses:learning_path_courses(
            id,
            course_id,
            order,
            is_required,
            course:courses(*)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching learning paths:', error);
        throw new Error('Failed to fetch learning paths');
      }
      
      return data as LearningPath[];
    },
  });
  
  // Fetch courses
  const { data: courses = [] } = useQuery({
    queryKey: ['allCourses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title', { ascending: true });
      
      if (error) {
        console.error('Error fetching courses:', error);
        throw new Error('Failed to fetch courses');
      }
      
      return data;
    },
  });
  
  // Create learning path mutation
  const createLearningPathMutation = useMutation({
    mutationFn: async (path: Omit<LearningPath, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('learning_paths')
        .insert(path)
        .select('*')
        .single();
      
      if (error) {
        console.error('Error creating learning path:', error);
        throw new Error('Failed to create learning path');
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Update learning path mutation
  const updateLearningPathMutation = useMutation({
    mutationFn: async (path: Partial<LearningPath> & { id: string }) => {
      const { data, error } = await supabase
        .from('learning_paths')
        .update({
          title: path.title,
          description: path.description,
          estimated_hours: path.estimated_hours,
          is_published: path.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', path.id)
        .select('*')
        .single();
      
      if (error) {
        console.error('Error updating learning path:', error);
        throw new Error('Failed to update learning path');
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Delete learning path mutation
  const deleteLearningPathMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting learning path:', error);
        throw new Error('Failed to delete learning path');
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Add course to learning path mutation
  const addCourseToPathMutation = useMutation({
    mutationFn: async ({ 
      pathId, 
      courseId, 
      isRequired 
    }: { 
      pathId: string; 
      courseId: string; 
      isRequired: boolean 
    }) => {
      // Get the current highest order
      const { data: currentCourses, error: fetchError } = await supabase
        .from('learning_path_courses')
        .select('order')
        .eq('learning_path_id', pathId)
        .order('order', { ascending: false })
        .limit(1);
      
      if (fetchError) {
        console.error('Error fetching current courses:', fetchError);
        throw new Error('Failed to fetch current courses');
      }
      
      const nextOrder = currentCourses.length > 0 ? (currentCourses[0].order || 0) + 1 : 1;
      
      const { data, error } = await supabase
        .from('learning_path_courses')
        .insert({
          learning_path_id: pathId,
          course_id: courseId,
          order: nextOrder,
          is_required: isRequired,
        })
        .select('*')
        .single();
      
      if (error) {
        console.error('Error adding course to path:', error);
        throw new Error('Failed to add course to path');
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Remove course from learning path mutation
  const removeCourseFromPathMutation = useMutation({
    mutationFn: async ({ 
      pathId, 
      pathCourseId 
    }: { 
      pathId: string; 
      pathCourseId: string 
    }) => {
      const { error } = await supabase
        .from('learning_path_courses')
        .delete()
        .eq('id', pathCourseId);
      
      if (error) {
        console.error('Error removing course from path:', error);
        throw new Error('Failed to remove course from path');
      }
      
      return { pathId, pathCourseId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Reorder course in learning path mutation
  const reorderPathCourseMutation = useMutation({
    mutationFn: async ({ 
      pathId, 
      orderedCourses 
    }: { 
      pathId: string; 
      orderedCourses: Array<{ id: string; order: number }> 
    }) => {
      // Use Promise.all to handle multiple updates
      const promises = orderedCourses.map(course => {
        return supabase
          .from('learning_path_courses')
          .update({ order: course.order })
          .eq('id', course.id);
      });
      
      const results = await Promise.all(promises);
      
      // Check for errors
      const errors = results.filter(result => result.error);
      if (errors.length > 0) {
        console.error('Error reordering courses:', errors);
        throw new Error('Failed to reorder courses');
      }
      
      return { pathId, orderedCourses };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningPaths'] });
    },
  });
  
  // Filter learning paths based on search term
  const filteredLearningPaths = learningPaths.filter(path => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      path.title.toLowerCase().includes(searchLower) ||
      (path.description && path.description.toLowerCase().includes(searchLower))
    );
  });
  
  // Create learning path
  const createLearningPath = async (path: Omit<LearningPath, 'id' | 'created_at'>) => {
    return createLearningPathMutation.mutateAsync(path);
  };
  
  // Update learning path
  const updateLearningPath = async (path: Partial<LearningPath> & { id: string }) => {
    return updateLearningPathMutation.mutateAsync(path);
  };
  
  // Delete learning path
  const deleteLearningPath = async (id: string) => {
    return deleteLearningPathMutation.mutateAsync(id);
  };
  
  // Add course to learning path
  const addCourseToPath = async ({ 
    pathId, 
    courseId, 
    isRequired 
  }: { 
    pathId: string; 
    courseId: string; 
    isRequired: boolean 
  }) => {
    return addCourseToPathMutation.mutateAsync({ pathId, courseId, isRequired });
  };
  
  // Remove course from learning path
  const removeCourseFromPath = async (pathId: string, pathCourseId: string) => {
    return removeCourseFromPathMutation.mutateAsync({ pathId, pathCourseId });
  };
  
  // Reorder course in learning path
  const reorderPathCourse = async (
    pathId: string, 
    orderedCourses: Array<{ id: string; order: number }>
  ) => {
    return reorderPathCourseMutation.mutateAsync({ pathId, orderedCourses });
  };
  
  return {
    learningPaths,
    filteredLearningPaths,
    courses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    createLearningPath,
    updateLearningPath,
    deleteLearningPath,
    addCourseToPath,
    removeCourseFromPath,
    reorderPathCourse,
    isCreatingPath: createLearningPathMutation.isPending,
    isUpdatingPath: updateLearningPathMutation.isPending,
    isDeletingPath: deleteLearningPathMutation.isPending,
  };
}
