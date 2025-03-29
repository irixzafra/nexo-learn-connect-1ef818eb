
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
      console.log("Fetching courses catalog...");
      
      // Obtener cursos publicados con datos del instructor en una sola consulta
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*, instructor:profiles(id, full_name)')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesError) {
        console.error("Error al obtener cursos:", coursesError);
        throw coursesError;
      }
      
      console.log("Cursos obtenidos:", coursesData?.length || 0);
      
      // Transformar y validar los datos
      const typedCourses: Course[] = coursesData?.map((course: any) => {
        // Validación estricta del campo currency
        let validCurrency: 'eur' | 'usd' = 'eur'; // valor por defecto
        
        // Verificar que currency sea un valor válido y convertirlo a minúsculas
        if (typeof course.currency === 'string') {
          const normalizedCurrency = course.currency.toLowerCase();
          if (normalizedCurrency === 'eur' || normalizedCurrency === 'usd') {
            validCurrency = normalizedCurrency as 'eur' | 'usd';
          }
        }
        
        // Extraer la información del instructor del objeto anidado
        const instructor = course.instructor 
          ? {
              id: course.instructor.id,
              full_name: course.instructor.full_name
            } 
          : undefined;

        return {
          ...course,
          currency: validCurrency,
          instructor
        } as Course;
      }) || [];
      
      setCourses(typedCourses);
    } catch (error: any) {
      console.error('Error al cargar los cursos:', error);
      let errorMessage = 'No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.';
      
      // Mensaje de error más específico para depuración
      if (error.message) {
        console.error('Mensaje de error específico:', error.message);
        
        // Solo en desarrollo o para administradores podríamos mostrar el mensaje específico
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
