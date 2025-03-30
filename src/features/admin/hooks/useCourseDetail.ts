
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  price: number;
  is_published: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  thumbnail_url?: string;
  estimated_duration?: number;
}

interface UseCourseDetailOptions {
  courseId?: string;
  onError?: (error: any) => void;
}

const useCourseDetail = ({ courseId, onError }: UseCourseDetailOptions) => {
  const { toast } = useToast();
  const [editedCourse, setEditedCourse] = useState<Partial<Course>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Fetch course details
  const { data: course, isLoading, error, refetch } = useQuery({
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
        if (onError) onError(error);
        throw error;
      }
      
      return data as Course;
    },
    enabled: !!courseId,
    retry: 1,
  });

  // Fetch course lessons
  const { data: lessons = [] } = useQuery({
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
      
      return data;
    },
    enabled: !!courseId,
  });

  // Fetch course modules
  const { data: modules = [] } = useQuery({
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
      
      return data;
    },
    enabled: !!courseId,
  });

  // Update course mutation
  const updateCourseMutation = useMutation({
    mutationFn: async (updatedData: Partial<Course>) => {
      if (!courseId) throw new Error('Course ID is required');
      
      const { data, error } = await supabase
        .from('courses')
        .update({
          ...updatedData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', courseId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Curso actualizado",
        description: "Los cambios han sido guardados correctamente.",
      });
      refetch();
    },
    onError: (error) => {
      console.error('Error updating course:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el curso. Inténtalo de nuevo.",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setEditedCourse(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCourseMutation.mutateAsync(editedCourse);
      setEditedCourse({});
    } catch (error) {
      console.error('Error in handleSave:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const fetchCourseDetails = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching course:', error);
        if (onError) onError(error);
        throw error;
      }
      
      return data as Course;
    } catch (error) {
      console.error('Error in fetchCourseDetails:', error);
      throw error;
    }
  };

  return {
    course,
    lessons,
    modules,
    isLoading,
    error,
    isSaving,
    editedCourse,
    handleInputChange,
    handleSwitchChange,
    handleSave,
    fetchCourseDetails,
  };
};

export default useCourseDetail;
