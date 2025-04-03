
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/types/course';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useInstructorCoursesManagement = (userId?: string) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  
  const { data: courses, isLoading, refetch } = useQuery({
    queryKey: ['instructorCourses', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          modules(count),
          instructor:instructor_id(*)
        `)
        .eq('instructor_id', userId)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    },
    enabled: !!userId
  });
  
  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && course.is_published;
    if (activeTab === 'drafts') return matchesSearch && !course.is_published;
    
    return matchesSearch;
  });
  
  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseToDelete.id);
      
      if (error) throw error;
      
      await refetch();
      toast.success('Curso eliminado correctamente');
      setCourseToDelete(null);
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Error al eliminar el curso');
    }
  };
  
  const createNewCourse = () => {
    navigate('/app/instructor/courses/create');
  };
  
  const navigateToCourse = (courseId: string) => {
    navigate(`/app/course/${courseId}`);
  };
  
  const navigateToEditor = (courseId: string) => {
    navigate(`/app/instructor/courses/${courseId}/editor`);
  };
  
  const navigateToStructure = (courseId: string) => {
    navigate(`/app/instructor/courses/${courseId}/structure`);
  };
  
  const navigateToEdit = (courseId: string) => {
    navigate(`/app/instructor/courses/${courseId}/edit`);
  };
  
  const navigateToAnalytics = (courseId: string) => {
    navigate(`/app/instructor/courses/${courseId}/analytics`);
  };

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    courses: filteredCourses,
    isLoading,
    courseToDelete,
    setCourseToDelete,
    handleDeleteCourse,
    createNewCourse,
    navigateToCourse,
    navigateToEditor,
    navigateToStructure,
    navigateToEdit,
    navigateToAnalytics
  };
};
