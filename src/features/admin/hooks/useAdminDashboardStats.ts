
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

// Interfaz para tipar los datos de estadísticas
interface DashboardStats {
  total_users: number;
  active_courses: number;
  total_enrollments: number;
  new_users_last_7_days: number;
}

export const useAdminDashboardStats = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.rpc('get_dashboard_stats');
        
        if (error) {
          throw error;
        }
        
        return data as DashboardStats;
      } catch (error: any) {
        console.error("Error fetching admin dashboard stats:", error);
        toast({
          title: "Error al cargar estadísticas",
          description: "No se pudieron cargar las estadísticas del panel de administración",
          variant: "destructive"
        });
        return {
          total_users: 0,
          active_courses: 0,
          total_enrollments: 0,
          new_users_last_7_days: 0
        };
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  return {
    stats: statsData || {
      total_users: 0,
      active_courses: 0,
      total_enrollments: 0,
      new_users_last_7_days: 0
    },
    isLoading
  };
};
