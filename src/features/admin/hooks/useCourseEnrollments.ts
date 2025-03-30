
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface EnrolledStudent {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  enrolled_at: string;
}

export const useCourseEnrollments = (courseId: string) => {
  const { 
    data: enrolledStudents = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["courseEnrollments", courseId],
    queryFn: async () => {
      try {
        if (!courseId) {
          throw new Error("ID del curso no proporcionado");
        }
        
        // Consulta que obtiene información de enrollments con join a profiles
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            user_id,
            profiles:user_id (
              full_name
            )
          `)
          .eq('course_id', courseId);

        if (error) throw error;
        
        if (!data || data.length === 0) return [];

        // Cargar los perfiles en una consulta separada para obtener email
        const userIds = data.map(enrollment => enrollment.user_id);
        let profilesData: any[] = [];
        
        if (userIds.length > 0) {
          const { data: profiles, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name')
            .in('id', userIds);
            
          if (!profilesError && profiles) {
            profilesData = profiles;
          }
        }

        // Crear un mapa para acceder rápidamente a la información de perfil
        const profilesMap = profilesData.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {});

        // Transformar los datos con la información disponible
        return data.map((enrollment: any) => {
          const profile = profilesMap[enrollment.user_id] || {};
          const profileName = enrollment.profiles?.full_name || profile.full_name;
          
          return {
            id: enrollment.id,
            user_id: enrollment.user_id,
            full_name: profileName || `Usuario ${enrollment.user_id.substring(0, 8)}`,
            email: null, // No tenemos acceso directo al email desde profiles
            enrolled_at: enrollment.enrolled_at
          };
        });
      } catch (error: any) {
        console.error("Error fetching enrolled students:", error);
        toast.error("Error al cargar estudiantes: " + error.message);
        throw error;
      }
    },
    enabled: !!courseId,
    retry: 1,
  });

  return { enrolledStudents, isLoading, error, refetch };
};
