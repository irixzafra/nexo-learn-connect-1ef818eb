
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

interface PopularCourse {
  course_id: string;
  title: string;
  enrollment_count: number;
}

export function useAdminDashboardStats() {
  const { data: stats, isLoading: isStatsLoading, error: statsError } = useQuery({
    queryKey: ['coursesAnalytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_courses_analytics');
      
      if (error) throw new Error(error.message);
      return data as CoursesAnalytics;
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
      coursesCount: stats?.total_courses || 0,
      publishedCoursesCount: stats?.published_courses || 0,
      draftCoursesCount: stats?.draft_courses || 0,
      categoriesCount: stats?.total_categories || 0,
      learningPathsCount: stats?.total_learning_paths || 0,
      enrollmentsCount: stats?.total_enrollments || 0,
      publicationRate: stats?.publication_rate || 0,
      completionRate: 65 // Example placeholder value
    },
    popularCourses: popularCourses || [],
    isLoading: isStatsLoading || isPopularCoursesLoading,
    error: statsError || popularCoursesError
  };
}
