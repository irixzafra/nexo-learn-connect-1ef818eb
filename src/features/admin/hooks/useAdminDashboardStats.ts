
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface CoursesAnalytics {
  total_courses: number;
  published_courses: number;
  draft_courses: number;
  total_categories: number;
  total_learning_paths: number;
  total_enrollments: number;
  publication_rate: number;
}

interface DashboardStats {
  total_users: number;
  active_courses: number;
  total_enrollments: number;
  new_users_last_7_days: number;
}

interface PopularCourse {
  course_id: string;
  title: string;
  enrollment_count: number;
}

export function useAdminDashboardStats() {
  const { data: courseStats, isLoading: isStatsLoading, error: statsError } = useQuery({
    queryKey: ['coursesAnalytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_courses_analytics');
      
      if (error) throw new Error(error.message);
      return data as CoursesAnalytics;
    }
  });

  const { data: dashboardStats, isLoading: isDashboardStatsLoading, error: dashboardStatsError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_dashboard_stats');
      
      if (error) throw new Error(error.message);
      return data as DashboardStats;
    }
  });

  const { data: popularCourses, isLoading: isPopularCoursesLoading, error: popularCoursesError } = useQuery({
    queryKey: ['popularCourses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_popular_courses', { limit_count: 5 });
      
      if (error) throw new Error(error.message);
      return data as PopularCourse[];
    }
  });

  return {
    stats: {
      // Map course analytics
      coursesCount: courseStats?.total_courses || 0,
      publishedCoursesCount: courseStats?.published_courses || 0,
      draftCoursesCount: courseStats?.draft_courses || 0,
      categoriesCount: courseStats?.total_categories || 0,
      learningPathsCount: courseStats?.total_learning_paths || 0,
      enrollmentsCount: courseStats?.total_enrollments || 0,
      publicationRate: courseStats?.publication_rate || 0,
      completionRate: 65, // Example placeholder value
      
      // Map dashboard stats
      total_users: dashboardStats?.total_users || 0,
      active_courses: dashboardStats?.active_courses || 0,
      total_enrollments: dashboardStats?.total_enrollments || 0,
      new_users_last_7_days: dashboardStats?.new_users_last_7_days || 0
    },
    popularCourses: popularCourses || [],
    isLoading: isStatsLoading || isPopularCoursesLoading || isDashboardStatsLoading,
    error: statsError || popularCoursesError || dashboardStatsError
  };
}
