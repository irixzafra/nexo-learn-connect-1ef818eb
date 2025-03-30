
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface EnrolledStudent {
  id: string;
  user_id: string;
  enrolled_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
}

export function useCourseEnrollments(courseId: string) {
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEnrollments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .rpc('get_course_enrollments_with_details', {
          course_id_param: courseId
        });
      
      if (error) throw error;
      
      const { data: studentsWithContact, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, phone')
        .in('id', data.map((student: any) => student.user_id));
      
      if (profilesError) throw profilesError;
      
      // Combinar los datos de inscripción con la información de contacto
      const studentsWithContactMap = studentsWithContact.reduce((acc: Record<string, any>, profile: any) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
      
      const enrichedStudents = data.map((student: any) => ({
        ...student,
        email: studentsWithContactMap[student.user_id]?.email || null,
        phone: studentsWithContactMap[student.user_id]?.phone || null
      }));
      
      setEnrolledStudents(enrichedStudents);
    } catch (err) {
      console.error('Error fetching course enrollments:', err);
      setError(err instanceof Error ? err : new Error('Error desconocido al cargar estudiantes'));
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchEnrollments();
  };

  useEffect(() => {
    if (courseId) {
      fetchEnrollments();
    }
  }, [courseId]);

  return {
    enrolledStudents,
    isLoading,
    error,
    refetch
  };
}
