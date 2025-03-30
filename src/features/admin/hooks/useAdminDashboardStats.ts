
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const useAdminDashboardStats = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: async () => {
      try {
        // Get total users count
        const { count: usersCount, error: usersError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        if (usersError) throw usersError;

        // Get total courses count
        const { count: coursesCount, error: coursesError } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true });

        if (coursesError) throw coursesError;

        // Get total enrollments count
        const { count: enrollmentsCount, error: enrollmentsError } = await supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true });

        if (enrollmentsError) throw enrollmentsError;

        // Get published courses count and calculate completion rate
        const { count: publishedCoursesCount, error: publishedError } = await supabase
          .from("courses")
          .select("*", { count: "exact", head: true })
          .eq("is_published", true);

        if (publishedError) throw publishedError;

        // Calculate course completion rate
        const completionRate = coursesCount > 0 
          ? Math.round((publishedCoursesCount / coursesCount) * 100) 
          : 0;

        return {
          usersCount: usersCount || 0,
          coursesCount: coursesCount || 0,
          enrollmentsCount: enrollmentsCount || 0,
          publishedCoursesCount: publishedCoursesCount || 0,
          completionRate
        };
      } catch (error) {
        console.error("Error fetching admin dashboard stats:", error);
        toast({
          title: "Error al cargar estadísticas",
          description: "No se pudieron cargar las estadísticas del panel de administración",
          variant: "destructive"
        });
        return {
          usersCount: 0,
          coursesCount: 0,
          enrollmentsCount: 0,
          publishedCoursesCount: 0,
          completionRate: 0
        };
      }
    },
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  return {
    stats: statsData || {
      usersCount: 0,
      coursesCount: 0,
      enrollmentsCount: 0,
      publishedCoursesCount: 0,
      completionRate: 0
    },
    isLoading
  };
};
