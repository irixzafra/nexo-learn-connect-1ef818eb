
import { useState, useEffect } from 'react';
import { PlatformStats } from '@/features/admin/analytics/types';

export const useAdminDashboardStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    total_users: 0,
    active_users: 0,
    new_users: 0,
    total_courses: 0,
    active_courses: 0,
    total_enrollments: 0,
    completion_rate: 0,
    average_rating: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Simular una petición a la API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Datos simulados para desarrollo
        const mockStats: PlatformStats = {
          total_users: 5842,
          active_users: 2731,
          new_users: 847,
          total_courses: 124,
          active_courses: 87,
          total_enrollments: 3542,
          completion_rate: 68,
          average_rating: 4.2,
          new_users_last_7_days: 847,
          coursesCount: 124,
          publishedCoursesCount: 87,
          completionRate: 68
        };
        
        setStats(mockStats);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido al cargar estadísticas'));
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
