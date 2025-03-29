
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
      
      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles(id, full_name)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error("Error en la consulta a Supabase:", supabaseError);
        throw supabaseError;
      }
      
      console.log("Cursos obtenidos:", data);
      
      // Transform the data to ensure it matches the Course type
      const typedCourses: Course[] = data?.map((course: any) => {
        // Extract instructor from the joined data
        let instructor = undefined;
        if (course.instructor) {
          // Handle the case where instructor might be an array with a single object
          if (Array.isArray(course.instructor) && course.instructor.length > 0) {
            instructor = {
              id: course.instructor[0].id,
              full_name: course.instructor[0].full_name
            };
          } else if (typeof course.instructor === 'object') {
            instructor = course.instructor;
          }
        }

        return {
          ...course,
          instructor,
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
