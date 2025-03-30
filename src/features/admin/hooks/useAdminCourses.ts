
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface Instructor {
  full_name: string | null;
}

export interface CourseData {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  instructor_id: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Instructor | null;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  instructor_id: string;
  is_published: boolean;
  status: string;
  students_count: number;
  created_at: string;
  updated_at: string;
  profiles?: Instructor | null;
  instructors?: {
    full_name: string | null;
  };
}

export const useAdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("Iniciando consulta de cursos...");
      
      // First, get all courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          id, 
          title, 
          description, 
          price, 
          currency, 
          instructor_id, 
          is_published,
          created_at, 
          updated_at
        `)
        .order('created_at', { ascending: false });
      
      if (coursesError) throw coursesError;
      
      console.log("Cursos encontrados:", coursesData);
      
      // Then, get instructor info for each course
      const formattedCourses: Course[] = await Promise.all((coursesData || []).map(async (course: any) => {
        let instructorName = 'Sin instructor asignado';
        
        if (course.instructor_id) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', course.instructor_id)
            .single();
            
          if (profileData) {
            instructorName = profileData.full_name || 'Sin nombre';
          }
        }
        
        return {
          ...course,
          instructors: {
            full_name: instructorName
          },
          status: course.is_published ? 'published' : 'draft',
          students_count: 0
        };
      }));
      
      console.log("Cursos formateados:", formattedCourses);
      setCourses(formattedCourses);
    } catch (error: any) {
      console.error('Error al obtener cursos:', error);
      setError(`No se pudieron cargar los cursos: ${error.message || 'Error desconocido'}`);
      toast.error("Error al cargar los cursos. Consulta la consola para más detalles.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    setCourses
  };
};
