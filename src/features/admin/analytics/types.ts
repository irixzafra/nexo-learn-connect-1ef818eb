export interface PlatformStats {
  total_users: number;
  active_users: number;
  new_users: number;
  total_courses: number;
  active_courses: number;
  total_enrollments: number;
  completion_rate: number;
  average_rating: number;
  new_users_last_7_days?: number;
  coursesCount?: number;
  publishedCoursesCount?: number;
  completionRate?: number;
}

export interface UserStats {
  total: number;
  active: number;
  newUsers: {
    daily: number[];
    weekly: number;
    monthly: number;
  };
  byRole: Record<string, number>;
  retention: number;
}

export interface CourseStats {
  total: number;
  active: number;
  published: number;
  enrollmentTrend: number[];
  popularCourses: {
    id: string;
    title: string;
    enrollments: number;
  }[];
  categoryDistribution: {
    name: string;
    value: number;
  }[];
}

export interface RevenueStats {
  total: number;
  monthly: number;
  yearly: number;
  trend: number[];
  byProduct: {
    name: string;
    value: number;
  }[];
}
