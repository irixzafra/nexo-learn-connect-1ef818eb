
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
      
      // 1. Obtener cursos publicados
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*, instructor_id')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (coursesError) {
        console.error("Error al obtener cursos:", coursesError);
        throw coursesError;
      }
      
      console.log("Cursos obtenidos:", coursesData?.length || 0);
      
      // 2. Obtener información de instructores por separado para evitar problemas de RLS
      const instructorIds = coursesData?.map(course => course.instructor_id) || [];
      let instructorsMap = {};
      
      if (instructorIds.length > 0) {
        const { data: instructorsData, error: instructorsError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', instructorIds);
          
        if (instructorsError) {
          console.error("Error al obtener datos de instructores:", instructorsError);
        } else if (instructorsData) {
          // Convertir array de instructores a un mapa para búsqueda rápida
          instructorsMap = instructorsData.reduce((acc, instructor) => {
            acc[instructor.id] = instructor;
            return acc;
          }, {});
          console.log("Datos de instructores obtenidos:", Object.keys(instructorsMap).length);
        }
      }
      
      // 3. Transformar y validar los datos
      const typedCourses: Course[] = coursesData?.map((course: any) => {
        // Validar y transformar el campo currency
        let validCurrency: 'eur' | 'usd' = 'eur'; // valor por defecto
        if (course.currency === 'eur' || course.currency === 'usd') {
          validCurrency = course.currency;
        }
        
        // Añadir información del instructor si existe
        const instructor = instructorsMap[course.instructor_id] 
          ? {
              id: instructorsMap[course.instructor_id].id,
              full_name: instructorsMap[course.instructor_id].full_name
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
