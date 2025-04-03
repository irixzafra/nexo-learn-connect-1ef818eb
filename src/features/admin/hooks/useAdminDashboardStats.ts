
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
        // Simular una petición a la API con un retraso realista
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Datos simulados para desarrollo
        const mockStats: PlatformStats = {
          total_users: 2568,
          active_users: 1874,
          new_users: 247,
          total_courses: 128,
          active_courses: 87,
          total_enrollments: 3542,
          completion_rate: 68,
          average_rating: 4.2,
          new_users_last_7_days: 247,
          coursesCount: 128,
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

  const refetchStats = async () => {
    setIsLoading(true);
    try {
      // Simular una actualización de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generar ligeras variaciones en los datos para simular actualización
      const randomVariation = (base: number, percentage: number = 5) => {
        const variation = Math.floor(base * (percentage / 100) * (Math.random() - 0.5));
        return base + variation;
      };
      
      setStats(prev => ({
        ...prev,
        total_users: randomVariation(prev.total_users, 1),
        active_users: randomVariation(prev.active_users),
        new_users: randomVariation(prev.new_users, 8),
        total_enrollments: randomVariation(prev.total_enrollments, 3),
      }));
    } catch (err) {
      console.error('Error refetching stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { stats, isLoading, error, refetchStats };
};
