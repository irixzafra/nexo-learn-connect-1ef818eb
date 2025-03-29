
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Course } from '@/types/course';
import { toast } from 'sonner';

export const useCoursesCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Iniciando obtención de catálogo de cursos...");
      
      // Consulta simplificada que solo usa la tabla courses sin joins
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
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesError) {
        console.error("Error al obtener cursos:", coursesError);
        throw coursesError;
      }
      
      console.log("Cursos obtenidos:", coursesData?.length || 0);
      console.log("Datos de cursos:", JSON.stringify(coursesData, null, 2));
      
      // Transformar y validar los datos
      const typedCourses: Course[] = coursesData?.map((course: any) => {
        // Validación estricta para campo currency
        let validCurrency: 'eur' | 'usd' = 'eur'; // valor predeterminado
        
        if (typeof course.currency === 'string') {
          const normalizedCurrency = course.currency.toLowerCase();
          if (normalizedCurrency === 'eur' || normalizedCurrency === 'usd') {
            validCurrency = normalizedCurrency as 'eur' | 'usd';
          }
        }
        
        // Crear un objeto instructor estructurado a partir de featured_instructor
        const instructor = course.featured_instructor 
          ? {
              id: course.instructor_id,
              full_name: course.featured_instructor
            } 
          : undefined;

        return {
          ...course,
          currency: validCurrency,
          instructor
        } as Course;
      }) || [];
      
      console.log("Cursos procesados:", typedCourses.length);
      setCourses(typedCourses);
    } catch (error: any) {
      console.error('Error al cargar los cursos:', error);
      let errorMessage = 'No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.';
      
      if (error.message) {
        console.error('Mensaje de error específico:', error.message);
        
        if (process.env.NODE_ENV === 'development') {
          errorMessage += ` (${error.message})`;
        }
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
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
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === null || course.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  return {
    courses,
    filteredCourses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedLevel,
    setSelectedLevel,
    clearFilters,
    fetchCourses
  };
};
