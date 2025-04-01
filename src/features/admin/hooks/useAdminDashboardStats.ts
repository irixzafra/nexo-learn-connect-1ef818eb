
import { useState, useEffect } from 'react';

interface DashboardStats {
  total_users: number;
  active_courses: number;
  total_enrollments: number;
  new_users_last_7_days: number;
  coursesCount: number;
  publishedCoursesCount: number;
  completionRate: number;
}

export const useAdminDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    active_courses: 0,
    total_enrollments: 0,
    new_users_last_7_days: 0,
    coursesCount: 0,
    publishedCoursesCount: 0,
    completionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        
        // En un entorno real, aquí habría una llamada a la API
        // Por ahora, simularemos datos para la demostración
        setTimeout(() => {
          setStats({
            total_users: 1245,
            active_courses: 87,
            total_enrollments: 3842,
            new_users_last_7_days: 42,
            coursesCount: 90,
            publishedCoursesCount: 87,
            completionRate: 68,
          });
          setIsLoading(false);
        }, 800);
        
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return { stats, isLoading, error };
};
