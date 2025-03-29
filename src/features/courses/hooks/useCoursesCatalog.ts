import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';
import { toast } from 'sonner';
import { featuredCourses } from '@/features/courses/utils/featuredCoursesData';

export const useCoursesCatalog = () => {
  const [courses, setCourses] = useState<any[]>(featuredCourses); // Use featuredCourses as fallback
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    setDebugInfo(null);
    
    try {
      // If we have live data from the API, uncomment the following code:
      /*
      console.log("Iniciando obtención de catálogo de cursos...");
      
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          id, 
          title, 
          description, 
          price, 
          currency, 
          instructor_id,
          created_at, 
          updated_at, 
          is_published, 
          cover_image_url, 
          level, 
          duration_text,
          featured_instructor
        `)
        .eq('is_published', true);

      if (coursesError) {
        console.error("Error al obtener cursos:", coursesError);
        setDebugInfo({
          errorType: 'database_query',
          errorMessage: coursesError.message,
          errorDetails: coursesError
        });
        throw coursesError;
      }
      
      setCourses(coursesData || []);
      */
      
      // For now, we'll use the mock data instead
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setCourses(featuredCourses);
      
    } catch (error: any) {
      console.error('Error al cargar los cursos:', error);
      let errorMessage = 'No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.';
      
      // For simulation, occasionally show an error
      const showRandomError = Math.random() > 0.9;
      
      if (showRandomError) {
        errorMessage = 'Error de recursión en políticas RLS. Por favor, contacte al administrador.';
        setDebugInfo({
          errorType: 'rls_recursion',
          errorMessage: "Recursive definition in RLS policy detected",
          suggestion: 'Revisar las políticas RLS de la tabla courses y la función get_user_role'
        });
        setError(errorMessage);
      } else {
        // No error case
        setError(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const clearFilters = () => {
    setSelectedLevel(null);
    setSearchTerm('');
    toast.info("Filtros eliminados", {
      description: "Mostrando todos los cursos disponibles"
    });
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = !selectedLevel || course.level.toLowerCase() === selectedLevel.toLowerCase();
    
    return matchesSearch && matchesLevel;
  });

  return {
    courses,
    filteredCourses,
    isLoading,
    error,
    debugInfo,
    searchTerm,
    setSearchTerm,
    selectedLevel,
    setSelectedLevel,
    clearFilters,
    fetchCourses
  };
};
