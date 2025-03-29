
import { useState, useEffect } from 'react';
import { Course } from '@/types/course';
import { connectionService } from '@/lib/offline/connectionService';
import { 
  getCachedCourses,
  getCachedCourse,
  addCourseToCache,
  getRecentlyViewedCourses
} from '@/lib/offline/indexedDB';
import { supabase } from '@/lib/supabase';

export const useOfflineCourses = () => {
  const [isOnline, setIsOnline] = useState(connectionService.isCurrentlyOnline());
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener un curso (online o offline)
  const getCourse = async (courseId: string): Promise<Course | null> => {
    if (isOnline) {
      try {
        // Intentar obtener desde API
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
          
        if (error) throw error;
        
        // Guardar en caché para uso offline
        if (data) {
          await addCourseToCache(data as Course);
        }
        
        return data as Course;
      } catch (error) {
        console.error('Error al obtener curso desde API:', error);
        // Si falla online, intentar desde caché
        return getCachedCourse(courseId);
      }
    } else {
      // Modo offline: obtener de caché
      return getCachedCourse(courseId);
    }
  };

  // Cargar cursos recientes desde caché
  const loadRecentCourses = async () => {
    setIsLoading(true);
    try {
      const courses = await getRecentlyViewedCourses(5);
      setRecentCourses(courses);
    } catch (error) {
      console.error('Error al cargar cursos recientes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para marcar un curso como visto
  const markCourseAsViewed = async (course: Course) => {
    await addCourseToCache(course);
    await loadRecentCourses(); // Recargar lista
  };

  // Escuchar cambios en conexión
  useEffect(() => {
    const unsubscribe = connectionService.addListener(online => {
      setIsOnline(online);
    });
    
    // Cargar cursos recientes al inicio
    loadRecentCourses();
    
    return unsubscribe;
  }, []);

  return {
    isOnline,
    recentCourses,
    isLoading,
    getCourse,
    markCourseAsViewed,
    refreshRecentCourses: loadRecentCourses
  };
};
