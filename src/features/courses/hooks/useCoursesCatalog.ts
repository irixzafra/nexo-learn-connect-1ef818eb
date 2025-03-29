
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      console.log("Fetching courses...");
      
      // Modificamos la consulta para evitar el problema de la relación entre courses y profiles
      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select(`
          *,
          instructor_id
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error("Error en la consulta a Supabase:", supabaseError);
        throw supabaseError;
      }
      
      console.log("Cursos obtenidos:", data);
      
      // Ahora obtenemos los datos de los instructores por separado
      const instructorIds = data?.map(course => course.instructor_id) || [];
      let instructors = {};
      
      if (instructorIds.length > 0) {
        const { data: instructorsData, error: instructorsError } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', instructorIds);
          
        if (instructorsError) {
          console.error("Error al obtener datos de instructores:", instructorsError);
        } else {
          // Crear un mapa para acceso rápido a los datos de los instructores
          instructors = instructorsData?.reduce((acc, instructor) => {
            acc[instructor.id] = instructor;
            return acc;
          }, {}) || {};
        }
      }
      
      // Transform the data to ensure it matches the Course type
      const typedCourses: Course[] = data?.map((course: any) => {
        // Add instructor information from our separate fetch
        let instructor = instructors[course.instructor_id] ? {
          id: instructors[course.instructor_id].id,
          full_name: instructors[course.instructor_id].full_name
        } : undefined;

        return {
          ...course,
          instructor,
          // Ensure currency is correctly typed
          currency: (course.currency === 'eur' || course.currency === 'usd') 
            ? course.currency 
            : 'eur' // Default to 'eur' if not a valid value
        } as Course;
      }) || [];
      
      setCourses(typedCourses);
    } catch (error: any) {
      console.error('Error al cargar los cursos:', error);
      setError('No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.');
      toast.error('Error al cargar los cursos. Por favor, inténtelo de nuevo más tarde.');
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
