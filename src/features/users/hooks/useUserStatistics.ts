
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  roleDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
  activityData: {
    name: string;
    registrations: number;
    logins: number;
    courses: number;
  }[];
}

export const useUserStatistics = () => {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userStats"],
    queryFn: async (): Promise<UserStats> => {
      try {
        // Get total users count
        const { count: totalUsers, error: countError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (countError) throw countError;

        // Para esta demo, generamos datos aleatorios
        // En una implementación real, se harían consultas a la base de datos para obtener estos datos
        const activeUsersCount = Math.floor((totalUsers || 0) * 0.7); // 70% activos
        const newUsersCount = Math.floor((totalUsers || 0) * 0.1); // 10% nuevos
        const inactiveUsersCount = Math.floor((totalUsers || 0) * 0.2); // 20% inactivos

        // Distribución de roles (simulada)
        const roleDistribution = [
          { name: "Estudiantes", value: Math.floor((totalUsers || 0) * 0.8), color: "#8884d8" },
          { name: "Instructores", value: Math.floor((totalUsers || 0) * 0.15), color: "#82ca9d" },
          { name: "Administradores", value: Math.floor((totalUsers || 0) * 0.05), color: "#ffc658" }
        ];

        // Datos de actividad (simulados)
        const activityData = [
          { name: "Lun", registrations: 12, logins: 34, courses: 8 },
          { name: "Mar", registrations: 15, logins: 40, courses: 10 },
          { name: "Mié", registrations: 8, logins: 25, courses: 5 },
          { name: "Jue", registrations: 10, logins: 32, courses: 7 },
          { name: "Vie", registrations: 18, logins: 45, courses: 12 },
          { name: "Sáb", registrations: 20, logins: 28, courses: 15 },
          { name: "Dom", registrations: 14, logins: 20, courses: 9 }
        ];

        return {
          totalUsers: totalUsers || 0,
          activeUsers: activeUsersCount,
          newUsers: newUsersCount,
          inactiveUsers: inactiveUsersCount,
          roleDistribution,
          activityData
        };
      } catch (error) {
        console.error("Error fetching user statistics:", error);
        toast({
          title: "Error al cargar estadísticas",
          description: "No se pudieron cargar las estadísticas de usuarios",
          variant: "destructive"
        });
        throw error;
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  return {
    stats: data || {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      inactiveUsers: 0,
      roleDistribution: [],
      activityData: []
    },
    isLoading,
    error
  };
};
