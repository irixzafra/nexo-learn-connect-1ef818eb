
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Interfaz para tipar los datos de estadísticas
export interface DashboardStats {
  total_users: number;
  active_courses: number;
  total_enrollments: number;
  new_users_last_7_days: number;
  coursesCount: number;
  publishedCoursesCount: number;
  completionRate: number;
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
        
        // Asumimos que obtenemos datos básicos de la función RPC
        // Complementamos con datos derivados
        const basicStats = data || {
          total_users: 0,
          active_courses: 0,
          total_enrollments: 0,
          new_users_last_7_days: 0,
        };
        
        // Datos derivados para AnalyticsTab
        return {
          ...basicStats,
          coursesCount: basicStats.active_courses || 0,
          publishedCoursesCount: Math.floor((basicStats.active_courses || 0) * 0.8), // 80% publicados como ejemplo
          completionRate: 75 // Porcentaje de ejemplo
        } as DashboardStats;
      } catch (error: any) {
        console.error("Error fetching admin dashboard stats:", error);
        toast.error("Error al cargar estadísticas del dashboard");
        
        return {
          total_users: 0,
          active_courses: 0,
          total_enrollments: 0,
          new_users_last_7_days: 0,
          coursesCount: 0,
          publishedCoursesCount: 0,
          completionRate: 0
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
      new_users_last_7_days: 0,
      coursesCount: 0,
      publishedCoursesCount: 0,
      completionRate: 0
    },
    isLoading
  };
};
