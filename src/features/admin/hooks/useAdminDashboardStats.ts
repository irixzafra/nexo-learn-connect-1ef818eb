
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

// Default stats object to prevent undefined errors
const defaultStats: DashboardStats = {
  total_users: 0,
  active_courses: 0,
  total_enrollments: 0,
  new_users_last_7_days: 0,
  coursesCount: 0,
  publishedCoursesCount: 0,
  completionRate: 0
};

export const useAdminDashboardStats = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.rpc('get_dashboard_stats');
        
        if (error) {
          throw error;
        }
        
        // Handle potentially null data from the RPC call
        if (!data) {
          console.warn('No data returned from get_dashboard_stats RPC');
          return defaultStats;
        }
        
        // Validate and sanitize the received data
        const basicStats = {
          total_users: data.total_users || 0,
          active_courses: data.active_courses || 0,
          total_enrollments: data.total_enrollments || 0,
          new_users_last_7_days: data.new_users_last_7_days || 0,
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
        
        // Return default stats on error to prevent undefined values
        return defaultStats;
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  return {
    stats: statsData || defaultStats,
    isLoading
  };
};
