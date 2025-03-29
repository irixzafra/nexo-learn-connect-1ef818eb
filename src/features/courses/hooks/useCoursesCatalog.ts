
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';
import { toast } from 'sonner';
import { featuredCourses } from '@/features/courses/utils/featuredCoursesData';

// Enhanced course data with additional properties for improved filters
const enhancedFeaturedCourses = featuredCourses.map(course => ({
  ...course,
  student_count: Math.floor(Math.random() * 2000) + 50,
  rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
  start_date: Math.random() > 0.4 ? 
    new Date(Date.now() + (Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString() : 
    undefined,
  tags: ['Javascript', 'React', 'Web', 'Frontend', 'Backend', 'UI/UX', 'DevOps']
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4) + 1),
  popular_score: Math.floor(Math.random() * 10) + 1,
  created_at: new Date(Date.now() - (Math.random() * 120 * 24 * 60 * 60 * 1000)).toISOString(),
}));

export const useCoursesCatalog = () => {
  const [courses, setCourses] = useState<any[]>(enhancedFeaturedCourses); // Use enhanced data as fallback
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
          featured_instructor,
          category,
          tags,
          start_date,
          end_date,
          student_count,
          rating,
          popular_score
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
      
      // Transform the data to include additional properties if needed
      const enhancedCoursesData = coursesData?.map(course => ({
        ...course,
        student_count: course.student_count || Math.floor(Math.random() * 1000),
        rating: course.rating || parseFloat((3 + Math.random() * 2).toFixed(1)),
        tags: course.tags || []
      })) || [];
      
      setCourses(enhancedCoursesData);
      */
      
      // For now, we'll use the mock data instead
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setCourses(enhancedFeaturedCourses);
      
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
    setSearchTerm('');
    toast.info("Filtros eliminados", {
      description: "Mostrando todos los cursos disponibles"
    });
  };

  const filteredCourses = courses.filter((course) => {
    return !searchTerm || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.category && course.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.featured_instructor && course.featured_instructor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.tags && course.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())));
  });

  return {
    courses,
    filteredCourses,
    isLoading,
    error,
    debugInfo,
    searchTerm,
    setSearchTerm,
    clearFilters,
    fetchCourses
  };
};
