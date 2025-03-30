
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
  status?: string;
  students_count?: number;
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
      
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id, 
          title, 
          description, 
          price, 
          currency, 
          instructor_id, 
          is_published,
          status,
          students_count,
          created_at, 
          updated_at,
          profiles:instructor_id (full_name)
        `)
        .order('created_at', { ascending: false });
      
      console.log("Respuesta de Supabase:", { data, error });
      
      if (error) throw error;
      
      const formattedCourses: Course[] = (data || []).map((course: any) => ({
        ...course,
        instructors: {
          full_name: course.profiles?.full_name || 'Sin instructor asignado'
        },
        status: course.status || (course.is_published ? 'published' : 'draft'),
        students_count: course.students_count || 0
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
